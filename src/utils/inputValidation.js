function validate(value){
    let error={};
    // Regular expression pattern for email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (value.firstName?.trim() === ""){
        error.firstName = "first name should not be empty";
    } else if (value.firstName?.length <= 3){
        error.firstName = "first name should have at least 4 characters";
    }
    
    if (value.lastName?.trim() === ""){
        error.lastName = "last name should not be empty";
    }else if (value.lastName?.length <= 3){
        error.lastName = "last name should have at least 4 characters";
    }

    if (value.email.trim() === '') {
        error.email = "Email should not be empty"
    }else if (!emailPattern.test(value.email)){
        error.email = "Email should be type email"
    }

    if (value.password?.trim() === '') {
        error.password = "Password should not be empty"
    }else if (value.password?.length <= 5) {
        error.password = "Password should have at least 6 characters"
    }

    if (value.confirm && (value.confirm?.trim() === '' || value.confirm !== value.password) ) {
        error.confirm = "Password not matches"
    }

    return error
}

export default validate