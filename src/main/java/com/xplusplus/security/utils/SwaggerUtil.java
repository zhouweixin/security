package com.xplusplus.security.utils;

import com.google.common.base.Predicate;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

/**
 * @Author: zhouweixin
 * @Description:
 * @Date: Created in 15:08 2018/8/1
 * @Modified By:
 */
@Configuration
@EnableSwagger2
public class SwaggerUtil {
    @Bean
    public Docket createRestApi() {
        Predicate<String> predicate = new Predicate<String>() {
            @Override
            public boolean apply(String input) {
                if(input.contains("/workRecord") || input.contains("/project")){
                    return true;
                }
                return false;
            }
        };

        return new Docket(DocumentationType.SWAGGER_2)
                .apiInfo(apiInfo())
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.xplusplus.security.controller"))
                .paths(predicate)
                .build();
    }

    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
                .title("徐州精诚特卫保安系统")   //标题
                .description("接口文件生成页面")     //说明
                .termsOfServiceUrl("http://39.108.89.212:8080/security")  //服务器地址
                .version("1.0")         //版本号
                .build();
    }
}
