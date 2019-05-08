// Check items when complete
$(document).on("click", ".check", function () {
    $(this).toggleClass("selected");
});

// When enter key is pressed append a new item to the list
$(".toDo").keydown(function (event) {
    if (event.which === 13) { 
        $('#default-todo-form').submit();
    }
});

// Delete items off list
$(document).on("click", ".remove", function () {
    $(this).parent().remove();
});