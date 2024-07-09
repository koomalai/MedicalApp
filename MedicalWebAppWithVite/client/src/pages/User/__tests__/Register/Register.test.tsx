import { fireEvent, render,screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { beforeEach, describe, expect, it } from "vitest";
import App from "../../../../App";
import React from "react";
import { server } from "../../../../mocks/server";
import { userRegisterUrl } from "../../../../services/Hooks/User/UseUserRegister";
import { HttpResponse, http } from "msw";
import { getConfirmPassword, getEmail, getFirstname, getLastname, getPassword, getShowConfirmPassword, getShowPassword, getShowVisibilityIcon, getSignUpButton } from "./ConstantFunction";

describe("Register", ()=>{
    beforeEach(() => {
        render(
            <React.StrictMode>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </React.StrictMode>,
        ); 
    });
    it("Should navigate to registration page when Register link is clicked", async() => {
        expect(screen.getByRole('link', { name: /Register/i })).toBeInTheDocument();
	    fireEvent.click(screen.getByRole('link', { name: /Register/i }));
        expect(global.window.location.pathname).toBe('/register');
    });
    it("Should contain a person icon at the top", async() => {
        expect(screen.getByTestId('PersonIcon')).toBeInTheDocument();
    });
    it("Should contain Register text at the top", async() => {
        expect(screen.getByTestId('sign-up-text')).toBeInTheDocument();
    });
    it("Firstname should be rendered", async() => {
        expect(getFirstname()).toBeInTheDocument();
    });
    it("Lastname should be rendered", async() => {
        expect(getLastname()).toBeInTheDocument();
    });
    it("Email should be rendered", async() => {
        expect(getEmail()).toBeInTheDocument();
    });
    it("Password should be rendered", async() => {
        expect(getPassword()).toBeInTheDocument();
    });
    it("Confirm password should be rendered", async() => {
        expect(getConfirmPassword()).toBeInTheDocument();
    });
    it("Confirm password should be rendered", async() => {
        expect(getSignUpButton()).toBeInTheDocument();
    });
    it("Firstname should be empty", async() => {
        expect(getFirstname().value).toBe("");
    });
    it("Lastname should be empty", async() => {
        expect(getLastname().value).toBe("");
    });
    it("Email should be empty", async() => {
        expect(getEmail().value).toBe("");
    });
    it("Password should be empty", async() => {
        expect(getPassword().value).toBe("");
    });
    it("Confirm password should be empty", async() => {
        expect(getConfirmPassword().value).toBe("");
    });
    it("Loading button should be disabled", async() => {
        await waitFor(() => {
            expect(getSignUpButton()).toBeDisabled();
        });
    });
    it("Show password", async() => {
        await waitFor(() => {
            expect(getShowPassword()).toBeInTheDocument();
        });
    });
    it("password as password type", async() => { 
        await waitFor(() => {
            expect(getPassword()).toHaveAttribute('type', 'password');
        });
    });
    it("Password visibility for password", async() => {
        fireEvent.click(getShowPassword());
        await waitFor(() => {
            expect(getShowVisibilityIcon()).toBeInTheDocument();
            expect(getPassword()).toHaveAttribute('type', 'text');
        });
    });
    it("Show Confirm password", async() => {
        await waitFor(() => {
            expect(getShowConfirmPassword()).toBeInTheDocument();
        });
    });
    it("Confirm password as password type", async() => { 
        await waitFor(() => {
            expect(getConfirmPassword()).toHaveAttribute('type', 'password');
        });
    });
    it("Confirm Password visibility for Confirm password", async() => {
        fireEvent.click(getShowConfirmPassword());
        await waitFor(() => {
            expect(getShowVisibilityIcon()).toBeInTheDocument();
            expect(getConfirmPassword()).toHaveAttribute('type', 'text');
        });
    });
    it("Input should change according to value typed", async() => {
        fireEvent.change(getFirstname(), { target: { value: 'Vaishnavi' } });
        fireEvent.change(getLastname(), { target: { value: 'Chandra' } });
        fireEvent.change(getEmail(), { target: { value: 'vaishnavi@gmail.com' } });
        fireEvent.change(getPassword(), { target: { value: 'Vai1308!' } });
        fireEvent.change(getConfirmPassword(), { target: { value: 'Vai1308!' } });

        await waitFor(() => {
            expect(getFirstname().value).toBe('Vaishnavi');
            expect(getLastname().value).toBe('Chandra');
            expect(getEmail().value).toBe('vaishnavi@gmail.com');
            expect(getPassword().value).toBe('Vai1308!');
            expect(getConfirmPassword().value).toBe('Vai1308!');
        });
    });
    it("Button must be disabled when only firstname exists and appropriate required error message must be shown", async() => {
        fireEvent.change(getFirstname(), { target: { value: 'Vaishnavi' } });
        fireEvent.change(getLastname(), { target: { value: '' } });
        fireEvent.change(getEmail(), { target: { value: '' } });
        fireEvent.change(getPassword(), { target: { value: '' } });
        fireEvent.change(getConfirmPassword(), { target: { value: '' } });
        fireEvent.focusOut(getLastname());
        fireEvent.focusOut(getEmail());
        fireEvent.focusOut(getPassword());
        fireEvent.focusOut(getConfirmPassword());

        await waitFor(() => {
            expect(getSignUpButton()).toBeDisabled();
            expect(screen.getByText('Lastname is required')).toBeInTheDocument();
            expect(screen.getByText('Email is required')).toBeInTheDocument();
            expect(screen.getByText('Password is required')).toBeInTheDocument();
            expect(screen.getByText('Confirm password is required')).toBeInTheDocument();
        });
    });
    it("Button must be disabled when only Lastnamename exists and appropriate required error message must be shown", async() => {
        fireEvent.change(getFirstname(), { target: { value: '' } });
        fireEvent.change(getLastname(), { target: { value: 'Chandra' } });
        fireEvent.change(getEmail(), { target: { value: '' } });
        fireEvent.change(getPassword(), { target: { value: '' } });
        fireEvent.change(getConfirmPassword(), { target: { value: '' } });
        fireEvent.focusOut(getFirstname());
        fireEvent.focusOut(getEmail());
        fireEvent.focusOut(getPassword());
        fireEvent.focusOut(getConfirmPassword());

        await waitFor(() => {
            expect(getSignUpButton()).toBeDisabled();
            expect(screen.getByText('Firstname is required')).toBeInTheDocument();
            expect(screen.getByText('Email is required')).toBeInTheDocument();
            expect(screen.getByText('Password is required')).toBeInTheDocument();
            expect(screen.getByText('Confirm password is required')).toBeInTheDocument();
        });
    });
    it("Button must be disabled when only Email exists and appropriate required error message must be shown", async() => {
        fireEvent.change(getFirstname(), { target: { value: '' } });
        fireEvent.change(getLastname(), { target: { value: '' } });
        fireEvent.change(getEmail(), { target: { value: 'vaishnavi@gmail.com' } });
        fireEvent.change(getPassword(), { target: { value: '' } });
        fireEvent.change(getConfirmPassword(), { target: { value: '' } });
        fireEvent.focusOut(getFirstname());
        fireEvent.focusOut(getLastname());
        fireEvent.focusOut(getPassword());
        fireEvent.focusOut(getConfirmPassword());

        await waitFor(() => {
            expect(getSignUpButton()).toBeDisabled();
            expect(screen.getByText('Firstname is required')).toBeInTheDocument();
            expect(screen.getByText('Lastname is required')).toBeInTheDocument();
            expect(screen.getByText('Password is required')).toBeInTheDocument();
            expect(screen.getByText('Confirm password is required')).toBeInTheDocument();
        });
    });
    it("Button must be disabled when only Password exists and appropriate required error message must be shown", async() => {
        fireEvent.change(getFirstname(), { target: { value: '' } });
        fireEvent.change(getLastname(), { target: { value: '' } });
        fireEvent.change(getEmail(), { target: { value: '' } });
        fireEvent.change(getPassword(), { target: { value: 'Vai1346*' } });
        fireEvent.change(getConfirmPassword(), { target: { value: '' } });
        fireEvent.focusOut(getFirstname());
        fireEvent.focusOut(getLastname());
        fireEvent.focusOut(getEmail());
        fireEvent.focusOut(getConfirmPassword());

        await waitFor(() => {
            expect(getSignUpButton()).toBeDisabled();
            expect(screen.getByText('Firstname is required')).toBeInTheDocument();
            expect(screen.getByText('Lastname is required')).toBeInTheDocument();
            expect(screen.getByText('Email is required')).toBeInTheDocument();
            expect(screen.getByText('Confirm password is required')).toBeInTheDocument();
        });
    });
    it("Button must be disabled when only Confirm Password exists and appropriate required error message must be shown", async() => {
        fireEvent.change(getFirstname(), { target: { value: '' } });
        fireEvent.change(getLastname(), { target: { value: '' } });
        fireEvent.change(getEmail(), { target: { value: '' } });
        fireEvent.change(getPassword(), { target: { value: '' } });
        fireEvent.change(getConfirmPassword(), { target: { value: 'Vai1346*' } });
        fireEvent.focusOut(getFirstname());
        fireEvent.focusOut(getLastname());
        fireEvent.focusOut(getEmail());
        fireEvent.focusOut(getPassword());

        await waitFor(() => {
            expect(getSignUpButton()).toBeDisabled();
            expect(screen.getByText('Firstname is required')).toBeInTheDocument();
            expect(screen.getByText('Lastname is required')).toBeInTheDocument();
            expect(screen.getByText('Email is required')).toBeInTheDocument();
            expect(screen.getByText('Password is required')).toBeInTheDocument();
        });
    });
    it("Button must be disabled when only 2 fields exist and appropriate required error message must be shown", async() => {
        fireEvent.change(getFirstname(), { target: { value: 'Vaishnavi' } });
        fireEvent.change(getLastname(), { target: { value: '' } });
        fireEvent.change(getEmail(), { target: { value: '' } });
        fireEvent.change(getPassword(), { target: { value: 'Vai1346*' } });
        fireEvent.change(getConfirmPassword(), { target: { value: '' } });

        fireEvent.focusOut(getLastname());
        fireEvent.focusOut(getEmail());
        fireEvent.focusOut(getConfirmPassword());

        await waitFor(() => {
            expect(getSignUpButton()).toBeDisabled();
            expect(screen.getByText('Lastname is required')).toBeInTheDocument();
            expect(screen.getByText('Email is required')).toBeInTheDocument();
            expect(screen.getByText('Confirm password is required')).toBeInTheDocument();
        });
    });
    it("Button must be disabled when only 3 fields exist and appropriate required error message must be shown", async() => {
        fireEvent.change(getFirstname(), { target: { value: 'Vaishnavi' } });
        fireEvent.change(getLastname(), { target: { value: '' } });
        fireEvent.change(getEmail(), { target: { value: '' } });
        fireEvent.change(getPassword(), { target: { value: 'Vai1346*' } });
        fireEvent.change(getConfirmPassword(), { target: { value: 'Vai1346*' } });

        fireEvent.focusOut(getLastname());
        fireEvent.focusOut(getEmail());
       
        await waitFor(() => {
            expect(getSignUpButton()).toBeDisabled();
            expect(screen.getByText('Lastname is required')).toBeInTheDocument();
            expect(screen.getByText('Email is required')).toBeInTheDocument();
        });
    });
    it("Button must be disabled when only 4 fields exist and appropriate required error message must be shown", async() => {
        fireEvent.change(getFirstname(), { target: { value: 'Vaishnavi' } });
        fireEvent.change(getLastname(), { target: { value: 'Chandra' } });
        fireEvent.change(getEmail(), { target: { value: '' } });
        fireEvent.change(getPassword(), { target: { value: 'Vai1346*' } });
        fireEvent.change(getConfirmPassword(), { target: { value: 'Vai1346*' } });

        fireEvent.focusOut(getEmail());
       
        await waitFor(() => {
            expect(getSignUpButton()).toBeDisabled();
            expect(screen.getByText('Email is required')).toBeInTheDocument();
        });
    });
    it("Button must be disabled when only all fields are required", async() => {
        fireEvent.change(getFirstname(), { target: { value: '' } });
        fireEvent.change(getLastname(), { target: { value: '' } });
        fireEvent.change(getEmail(), { target: { value: '' } });
        fireEvent.change(getPassword(), { target: { value: '' } });
        fireEvent.change(getConfirmPassword(), { target: { value: '' } });

        fireEvent.focusOut(getFirstname());
        fireEvent.focusOut(getLastname());
        fireEvent.focusOut(getEmail());
        fireEvent.focusOut(getPassword());
        fireEvent.focusOut(getConfirmPassword());

        await waitFor(() => {
            expect(getSignUpButton()).toBeDisabled();
            expect(screen.getByText('Firstname is required')).toBeInTheDocument();
            expect(screen.getByText('Lastname is required')).toBeInTheDocument();
            expect(screen.getByText('Email is required')).toBeInTheDocument();
            expect(screen.getByText('Password is required')).toBeInTheDocument();
            expect(screen.getByText('Confirm password is required')).toBeInTheDocument();
        });
    });
    it("Button must be enabled when only all fields exist", async() => {
        fireEvent.change(getFirstname(), { target: { value: 'Vaishnavi' } });
        fireEvent.change(getLastname(), { target: { value: 'Chandra' } });
        fireEvent.change(getEmail(), { target: { value: 'vaishnavi@gmail.com' } });
        fireEvent.change(getPassword(), { target: { value: 'Vai1368*' } });
        fireEvent.change(getConfirmPassword(), { target: { value: 'Vai1368*' } });

        await waitFor(() => {
            expect(getSignUpButton()).not.toBeDisabled();
        });
    });
    it("Fields are required", () => {
        expect(getFirstname()).toBeRequired();
        expect(getLastname()).toBeRequired();
        expect(getEmail()).toBeRequired();
        expect(getPassword()).toBeRequired();
        expect(getConfirmPassword()).toBeRequired();
    });
    it("Validation error when email is not valid", async() => {  
        fireEvent.change(getEmail(), { target: { value: 'koomalai' } });
        fireEvent.focusOut(getEmail());
    
        await waitFor(() => {
            expect(getSignUpButton()).toBeDisabled();
            expect(screen.getByText('Email not valid')).toBeInTheDocument();
        });
    });
    it("Validation error when email does not match format", async() => {
        fireEvent.change(getEmail(), { target: { value: 'koomalai@acc.com' } });
        fireEvent.focusOut(getEmail());
    
        await waitFor(() => {
            expect(getSignUpButton()).toBeDisabled();
            expect(screen.getByText('Email does not match format')).toBeInTheDocument();
        });
    });
    it("Validation error when password is not valid", async() => {
        fireEvent.change(getPassword(), { target: { value: 'Kal13048' } });
        fireEvent.focusOut(getPassword());
    
        await waitFor(() => {
            expect(getSignUpButton()).toBeDisabled();
            expect(screen.getByText('Not valid password')).toBeInTheDocument();
        });
    });
    it("Validation error when password is less than 8 characters", async() => {
        fireEvent.change(getPassword(), { target: { value: 'Kal13*' } });
        fireEvent.focusOut(getPassword());
    
        await waitFor(() => {
            expect(getSignUpButton()).toBeDisabled();
            expect(screen.getByText('Password must be 8 characters')).toBeInTheDocument();
        });
    });
    it("Validation error when password is more than 8 characters", async() => {
        fireEvent.change(getPassword(), { target: { value: 'Kal1304685*' } });
        fireEvent.focusOut(getPassword());
    
        await waitFor(() => {
            expect(getSignUpButton()).toBeDisabled();
            expect(screen.getByText('Password must be 8 characters')).toBeInTheDocument();
        });
    });
    it("Validation error when confirm password and password do not match", async() => {
        fireEvent.change(getPassword(), { target: { value: 'Vai1364*' } });
        fireEvent.focusOut(getPassword());
        fireEvent.change(getConfirmPassword(), { target: { value: 'Val1364*' } });
        fireEvent.focusOut(getConfirmPassword());
    
        await waitFor(() => {
            expect(getSignUpButton()).toBeDisabled();
            expect(screen.getByText('Passwords must match')).toBeInTheDocument();
        });
    });
    it("Should contain Already have an account text for user who already has an account", async() => {
        expect(screen.getByText('Already have an account?')).toBeInTheDocument();
    });
    it("Should contain link to login page", async() => {
        expect(screen.getByRole('link', { name: /Sign In/i })).toBeInTheDocument();
    });
    it("Should contain copyright text at the end", async() => {
        expect(screen.getByText('My Medical Shop')).toBeInTheDocument();
    });
    it('should call handleRegister when user already exists on form submit', async () => {
        expect(global.window.location.pathname).toBe('/register');
        server.use(
            http.post(userRegisterUrl, () => {
              return HttpResponse.json(false,{ 
                    headers: { "Content-Type":"application/json", "Accept":"application/json", "Access-Cross-Allow-Origin":"*"} 
                });
            }),
        );
        fireEvent.change(getFirstname(), { target: { value: 'Kalaivani' } });
        fireEvent.change(getLastname(), { target: { value: 'Chandra' } });
        fireEvent.change(getEmail(), { target: { value: 'kalaivani@gmail.com' } });
        fireEvent.change(getPassword(), { target: { value: 'Kal1304*' } });
        fireEvent.change(getConfirmPassword(), { target: { value: 'Kal1304*' } });
        //console.log(getEmail());
        expect(getSignUpButton()).not.toBeDisabled();
        await waitFor(()=>{
            fireEvent.click(getSignUpButton());
        });
        expect(global.window.location.pathname).toBe('/register');
        expect(screen.getByRole('alert')).toHaveTextContent('Check if user already exists');
    });
    it('should call handleRegister when there is no server', async () => {
        expect(global.window.location.pathname).toBe('/register');
        const payload={
            "Firstname": "Kalaivani",
            "Lastname": "Chandra",
            "Email": "kalaivani@gmail.com",
            "Password": "Kal1304*",
            "ConfirmPassword": "Kal1304*"
        }
        //let data = await request.json();
        console.log("payload: ", payload);
        //console.log("data: ", data);
        //expect(request.body).equals(payload);
      
        server.use(
            http.post(userRegisterUrl, () => {
                return HttpResponse.error()
            }),
        );
        fireEvent.change(getFirstname(), { target: { value: 'Kalaivani' } });
        fireEvent.change(getLastname(), { target: { value: 'Chandra' } });
        fireEvent.change(getEmail(), { target: { value: 'kalaivani@gmail.com' } });
        fireEvent.change(getPassword(), { target: { value: 'Kal1304*' } });
        fireEvent.change(getConfirmPassword(), { target: { value: 'Kal1304*' } });
        //console.log(getEmail());
        expect(getSignUpButton()).not.toBeDisabled();
        await waitFor(()=>{
            fireEvent.click(getSignUpButton());
        });
        expect(global.window.location.pathname).toBe('/register');
        expect(screen.getByRole('alert')).toHaveTextContent('Cannot register');
    });
    it('should call handleRegister with correct parameters on form submit and direct to login page', async () => {
        expect(global.window.location.pathname).toBe('/register');
        fireEvent.change(getFirstname(), { target: { value: 'Tulasi' } });
        fireEvent.change(getLastname(), { target: { value: 'Narayan' } });
        fireEvent.change(getEmail(), { target: { value: 'tulasi@gmail.com' } });
        fireEvent.change(getPassword(), { target: { value: 'Tul1308!' } });
        fireEvent.change(getConfirmPassword(), { target: { value: 'Tul1308!' } });
        //console.log(getEmail());
        expect(getSignUpButton()).not.toBeDisabled();
        await waitFor(()=>{
            fireEvent.click(getSignUpButton());
        });
        expect(global.window.location.pathname).toBe('/login');
        expect(screen.getByRole('alert')).toHaveTextContent('Successfully Registered');
    });
});

