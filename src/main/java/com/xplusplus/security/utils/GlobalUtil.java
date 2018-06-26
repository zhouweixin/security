package com.xplusplus.security.utils;

import java.time.*;
import java.time.temporal.ChronoUnit;
import java.util.Date;

/**
 * @Author: zhouweixin
 * @Description:
 * @Date: Created in 20:47 2018/5/7
 * @Modified By:
 */
public class GlobalUtil {

	/**
	 * 计算周期
	 * 
	 * @param startDate
	 * @param endDate
	 * @return
	 */
	public static Period computePeriod(Date startDate, Date endDate) {
		// 计算周期
		if (startDate != null && endDate != null) {
			// Date -> LocalDate
			Instant startInstant = startDate.toInstant();
			Instant endInstant = endDate.toInstant();
			ZoneId zone = ZoneId.systemDefault();
			LocalDate start = LocalDateTime.ofInstant(startInstant, zone).toLocalDate();
			LocalDate end = LocalDateTime.ofInstant(endInstant, zone).toLocalDate();

			// 计算时间差
			return Period.between(start, end);
		}
		
		return null;
	}


    /**
     * 计算工作时长
     * @param startTime
     * @param endTime
     * @param startBreakTime
     * @param endBreakTime
     * @return
     */
    public static long computeWorkPeriod(Date startTime, Date endTime,
                                               Date startBreakTime, Date endBreakTime) {
        // 计算休息时长-基于时间（时、分、秒等）
        if (startTime != null && endTime != null
                && startBreakTime != null && endBreakTime != null) {
            Instant ins1 = startTime.toInstant();
            Instant ins2 = endTime.toInstant();
            Instant ins3 = startBreakTime.toInstant();
            Instant ins4 = endBreakTime.toInstant();

            // 计算时间差
            return ChronoUnit.MINUTES.between(ins1,ins2)-ChronoUnit.MINUTES.between(ins3,ins4);
        }
        return 0;
    }

    /**
     * 计算休息时长
     * @param startTime
     * @param endTime
     * @return
     */
	public static long computeBreakPeriod(Date startTime, Date endTime) {
		// 计算工作时长-基于时间（时、分、秒等）
		if (startTime != null && endTime != null) {
			Instant startInstant = startTime.toInstant();
			Instant endInstant = endTime.toInstant();

			// 计算时间差
			return ChronoUnit.MINUTES.between(startInstant,endInstant);
		}
        return 0;
    }

    /**
     * 计算两点间距离
     *
     * @param longitude1
     * @param latitude1
     * @param longitude2
     * @param latitude2
     * @return
     */
    public static double getDistance(double longitude1, double latitude1, double longitude2, double latitude2) {
        // 经度
        double lon1 = (Math.PI / 180) * longitude1;
        double lon2 = (Math.PI / 180) * longitude2;

	    // 维度
        double lat1 = (Math.PI / 180) * latitude1;
        double lat2 = (Math.PI / 180) * latitude2;

        // 地球半径
        double R = 6371;

        // 两点间距离 km，如果想要米的话，结果*1000就可以了
        double d = Math.acos(Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1)) * R;

        return d * 1000;
    }

}
