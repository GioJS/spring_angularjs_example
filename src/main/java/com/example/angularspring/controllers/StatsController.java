package com.example.angularspring.controllers;


import com.example.angularspring.repositories.CustomerRepository;
import com.example.angularspring.repositories.ProductRepository;
import com.example.angularspring.repositories.utils.GroupByEntry;
import com.fasterxml.jackson.annotation.JsonAutoDetect;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/statistics")
public class StatsController {
    @Autowired
    private CustomerRepository customerRepo;

    @Autowired
    private ProductRepository productRepo;


    @RequestMapping(value = "/getCustomerSumPrices", produces = "application/json")
    //@ResponseBody @RestController is assumed @ResponseBody
    public ChartData<Double> getCustomerSumPrices() {
        List<GroupByEntry<String, Double>> entries = customerRepo.productsPricesSum();

        List<String> names = new ArrayList<>();
        List<Double> values = new ArrayList<>();

        for (GroupByEntry<String, Double> entry : entries) {
            names.add(entry.getId());
            values.add(entry.getData());
        }

        return new ChartData<>(names, values);
    }


    @RequestMapping(value = "getProductsTrend", produces = "application/json")
    //@ResponseBody
    public ChartData getProductsTrend() {
        List<GroupByEntry<String, Integer>> entries = productRepo.countAllByCustomers();

        List<String> names = new ArrayList<>();
        List<Integer> values = new ArrayList<>();

        for (GroupByEntry<String, Integer> entry : entries) {
            names.add(entry.getId());
            values.add(entry.getData());
        }

        return new ChartData<>(names, values);
    }

    @RequestMapping(value = "/getProductsCustomersBar", produces = "application/json")
    //@ResponseBody
    public ChartData getProductsCustomersBar() {
        List<GroupByEntry<String, Integer>> entries = customerRepo.countAllByProducts();

        List<String> names = new ArrayList<>();
        List<Integer> values = new ArrayList<>();

        for (GroupByEntry<String, Integer> entry : entries) {
            names.add(entry.getId());
            values.add(entry.getData());
        }

        return new ChartData<>(names, values);
    }

    @JsonAutoDetect
    private class ChartData<E> implements Serializable {

        public List<String> getNames() {
            return names;
        }

        public void setNames(List<String> names) {
            this.names = names;
        }

        public List<E> getValues() {
            return values;
        }

        public void setValues(List<E> values) {
            this.values = values;
        }

        private List<String> names;
        private List<E> values;

        ChartData(List<String> names, List<E> values) {
            this.names = names;
            this.values = values;
        }
    }
}
