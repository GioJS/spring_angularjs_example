package com.example.angularspring.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMethod;

import com.example.angularspring.entities.Customer;
import com.example.angularspring.repositories.CustomerRepository;

//rest controller on customers resource
@RestController //@Controller & @ResponseBody
@RequestMapping("/customers")
public class CustomerController {
    @Autowired
    private CustomerRepository repo;

    //return all customers found in db
    @RequestMapping(value = "/getCustomers", produces = "application/json")
    public //@ResponseBody
    List<Customer> getCustomers() {
        return (List<Customer>) repo.findAll();
    }

    //add a new customer or update an existing customer, from a json
    @RequestMapping(value = "/addCustomer", method = RequestMethod.PUT, produces = "application/json")
    //@ResponseBody
    public ResponseEntity<String> addCustomer(@RequestBody Customer customer, BindingResult res) {
        if (res.hasErrors()) {
            return new ResponseEntity<>("{\"message\":\"" + res.getAllErrors().toString() + "\"}", HttpStatus.INTERNAL_SERVER_ERROR);
        }

        repo.save(customer);
        return new ResponseEntity<>("{\"message\":\"success\"}", HttpStatus.OK);
    }

    //remove a customer by id
    @RequestMapping(value = "/removeCustomer/{id}", method = RequestMethod.DELETE, produces = "application/json")
    //@ResponseBody
    public ResponseEntity<String> removeCustomer(@PathVariable Long id) {

        Customer c = repo.findOne(id);
        if(c == null) {
            return new ResponseEntity<>("{\"message\":\"customer not found\"}", HttpStatus.NOT_FOUND);
        }
        repo.delete(c);
        return new ResponseEntity<>("{\"message\":\"success\"}", HttpStatus.OK);

    }

}
