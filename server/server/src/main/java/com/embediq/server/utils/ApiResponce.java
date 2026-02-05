package com.embediq.server.utils;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ApiResponce <T>{
    private Boolean success;
    private  String message;
    private  T data;
}
