package com.example.angularspring.controllers;

import com.example.angularspring.entities.Product;
import com.example.angularspring.repositories.ProductRepository;
import com.example.angularspring.repositories.utils.GroupByEntry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {
    @Autowired
    private ProductRepository repo;

    @RequestMapping("/getProducts")
    public List<Product> getProducts() {
        return (List<Product>) repo.findAll();
    }


    //add a new customer or update an existing customer, from a json
    @RequestMapping(value = "/addProduct", method = RequestMethod.PUT, produces = "application/json")
    @ResponseBody
    public ResponseEntity<String> addProduct(@RequestBody Product product, BindingResult res) {
        if (res.hasErrors()) {
            return new ResponseEntity<String>("{\"message\":\"" + res.getAllErrors().toString() + "\"}", HttpStatus.INTERNAL_SERVER_ERROR);
        }

        repo.save(product);
        return new ResponseEntity<String>("{\"message\":\"success\"}", HttpStatus.OK);
    }

    @RequestMapping("/itemsCount/{id}")
    @ResponseBody
    public Integer getItemsCount(@PathVariable Integer id) {
        return repo.countProductsByCustomerId(id);
    }


}
