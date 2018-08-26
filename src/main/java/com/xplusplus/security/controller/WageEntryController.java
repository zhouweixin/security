package com.xplusplus.security.controller;

import com.xplusplus.security.domain.Result;
import com.xplusplus.security.domain.WageEntry;
import com.xplusplus.security.service.WageEntryService;
import com.xplusplus.security.utils.ResultUtil;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Set;

/**
 * @Author: zhouweixin
 * @Description:
 * @Date: Created in 10:59 2018/8/12
 * @Modified By:
 */
@RestController
@RequestMapping(value = "/wageEntry")
@Api(tags = "工资单接口")
public class WageEntryController {
    @Autowired
    private WageEntryService wageEntryService;

    @ApiOperation(value = "生成工资单")
    @GetMapping(value = "/generateWageEntry")
    public Result<Object> generateWageEntry(@ApiParam(value = "日期, 格式为yyyy-MM") @RequestParam @DateTimeFormat(pattern = "yyyy-MM") Date date){
        wageEntryService.generateWageEntry(date);
        return ResultUtil.success();
    }

    @ApiOperation(value = "重新生成工资单")
    @GetMapping(value = "/reGenerateWageEntry")
    public Result<Object> reGenerateWageEntry(@ApiParam(value = "日期, 格式为yyyy-MM") @RequestParam @DateTimeFormat(pattern = "yyyy-MM") Date date){
        wageEntryService.reGenerateWageEntry(date);
        return ResultUtil.success();
    }

    @ApiOperation(value = "通过日期和姓名模糊查询-分页")
    @GetMapping(value = "/getByDateAndNameLikeByPage")
    public Result<Page<WageEntry>> getByDateAndNameLikeByPage(
            @ApiParam(value = "日期, 格式为yyyy-MM, 默认为2000-01表示不启用此字段检索", defaultValue = "2000-01") @RequestParam @DateTimeFormat(pattern = "yyyy-MM") Date date,
            @ApiParam(value = "姓名, 默认为\"\"表示查询所有", defaultValue = "") @RequestParam(defaultValue = "") String name,
            @ApiParam(value = "页码", defaultValue = "0") @RequestParam(value = "page", defaultValue = "0") Integer page,
            @ApiParam(value = "每页记录数", defaultValue = "10") @RequestParam(value = "size", defaultValue = "10") Integer size,
            @ApiParam(value = "排序字段名", defaultValue = "startTime")@RequestParam(value = "sortFieldName", defaultValue = "startTime") String sortFieldName,
            @ApiParam(value = "排序方向, 0降序; 1升序", defaultValue = "0")@RequestParam(value = "asc", defaultValue = "0") Integer asc){
        return ResultUtil.success(wageEntryService.getByDateAndNameLikeByPage(date, name, page, size, sortFieldName, asc));
    }

    @ApiOperation(value = "批量更新")
    @PostMapping(value = "/update")
    public Result<Object> update(@ApiParam(value = "工资单数组") @RequestBody Set<WageEntry> wageEntries){
        wageEntryService.update(wageEntries);
        return ResultUtil.success();
    }

    @ApiOperation(value = "通过月份查询所有")
    @PostMapping(value = "/getAllByMonth")
    public Result<List<WageEntry>> getAllByMonth(@ApiParam(value = "时间, 格式为yyyy-MM") @RequestParam @DateTimeFormat(pattern = "yyyy-MM") Date date){
        return ResultUtil.success(wageEntryService.getAllByMonth(date));
    }

    @ApiOperation(value = "通过日期导出工资单")
    @GetMapping(value = "/exportByDate")
    public Result<Object> exportByDate(
            @ApiParam(value = "日期, 格式为yyyy-MM") @RequestParam @DateTimeFormat(pattern = "yyyy-MM") Date date,
            HttpServletResponse response) throws IOException {

        Workbook workbook = wageEntryService.exportByDate(date);

        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);

        String fileName = String.format("%d年%d月工资单.xlsx", calendar.get(Calendar.YEAR), calendar.get(Calendar.MONTH) + 1);
        response.addHeader("Content-Disposition", "attachment;fileName=" + new String(fileName.getBytes(StandardCharsets.UTF_8), StandardCharsets.ISO_8859_1));

        response.flushBuffer();
        workbook.write(response.getOutputStream());
        return ResultUtil.success();
    }
}
