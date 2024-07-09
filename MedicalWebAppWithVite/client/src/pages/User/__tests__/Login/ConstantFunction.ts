import {screen} from '@testing-library/dom'

export function getEmail() {
    return screen.getByTestId<HTMLInputElement>(/login-email/i);
}
export function getPassword() {
    return screen.getByTestId<HTMLInputElement>(/login-password/i) ;
}
export function getShowPassword() {
    return screen.getByTestId("show-password");
}
export function getShowVisibilityIcon() {
    return screen.getByTestId("VisibilityIcon");
}
export function getLoginButton() {
    return screen.getByRole("button", { name: /Login/i });
}