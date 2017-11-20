package com.example.angularspring.repositories.utils;


public class GroupByEntry<E, T> {
    public E getId() {
        return id;
    }

    public void setId(E id) {
        this.id = id;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    public GroupByEntry(E id, T data) {
        this.id = id;
        this.data = data;
    }

    private E id;
    private T data;
}
