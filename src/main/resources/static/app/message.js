function message(rootscope, type, description){
    rootscope.message.alert = type;
    rootscope.message.description = description;
    rootscope.message.show = true;
}