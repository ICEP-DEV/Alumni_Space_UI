var app = angular.module('passwordResetApp', []);

app.controller('PasswordResetController', function() {
    var vm = this;

    vm.resetPassword = function() {
        if (vm.newPassword === vm.confirmPassword) {
            vm.successMessage = 'Password reset successfully';
            vm.errorMessage = ''; // Clear any previous error message
        } else {
            vm.errorMessage = 'Passwords do not match';
            vm.successMessage = ''; // Clear any previous success message
        }
    };
});
