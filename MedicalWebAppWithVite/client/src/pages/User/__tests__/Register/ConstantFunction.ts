import {screen} from '@testing-library/dom'

export function getFirstname() {
    return screen.getByTestId<HTMLInputElement>(/sign-up-firstname/i);
}
export function getLastname() {
    return screen.getByTestId<HTMLInputElement>(/sign-up-lastname/i);
}
export function getEmail() {
    return screen.getByTestId<HTMLInputElement>(/sign-up-email/i);
}
export function getPassword() {
    return screen.getByTestId<HTMLInputElement>(/sign-up-password/i) ;
}
export function getConfirmPassword() {
    return screen.getByTestId<HTMLInputElement>(/sign-up-confirm-password/i) ;
}
export function getShowPassword() {
    return screen.getByTestId("sign-up-show-password");
}
export function getShowConfirmPassword() {
    return screen.getByTestId("sign-up-show-confirm-password");
}
export function getShowVisibilityIcon() {
    return screen.getByTestId("VisibilityIcon");
}
export function getSignUpButton() {
    return screen.getByTestId("sign-up-button");
}