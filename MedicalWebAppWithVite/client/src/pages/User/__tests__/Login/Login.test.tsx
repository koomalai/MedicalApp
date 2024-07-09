import { fireEvent, render,screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { beforeEach, describe, expect, it } from "vitest";
import App from "../../../../App";
import React from "react";
import { server } from "../../../../mocks/server";
import { HttpResponse, http } from "msw";
import { getEmail, getLoginButton, getPassword, getShowPassword, getShowVisibilityIcon } from "./ConstantFunction";
import { userLoginUrl } from "../../../../services/Hooks/User/UseUserLogin";

describe("Login", ()=>{
    beforeEach(() => {
        render(
            <React.StrictMode>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </React.StrictMode>,
        ); 
    });
    it("Should contain a person icon at the top", async() => {
        expect(screen.getByTestId('PersonIcon')).toBeInTheDocument();
    });
    it("Should contain Register text at the top", async() => {
        expect(screen.getByTestId('login_text')).toBeInTheDocument();
    });
    it("Email should be rendered", async() => {
        expect(getEmail()).toBeInTheDocument();
    });
    it("Password should be rendered", async() => {
        expect(getPassword()).toBeInTheDocument();
    });
    it("Confirm password should be rendered", async() => {
        expect(getLoginButton()).toBeInTheDocument();
    });
    it("Email should be empty", async() => {
        expect(getEmail().value).toBe("");
    });
    it("Password should be empty", async() => {
        expect(getPassword().value).toBe("");
    });
    it("Loading button should be disabled", async() => {
        await waitFor(() => {
            expect(getLoginButton()).toBeDisabled();
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
    it("Input should change according to value typed", async() => {
        fireEvent.change(getEmail(), { target: { value: 'vaishnavi@gmail.com' } });
        fireEvent.change(getPassword(), { target: { value: 'Vai1308!' } });
        
        await waitFor(() => {
            expect(getEmail().value).toBe('vaishnavi@gmail.com');
            expect(getPassword().value).toBe('Vai1308!');
        });
    });
    it("Button must be disabled when only email exists and appropriate required error message must be shown", async() => {
        fireEvent.change(getEmail(), { target: { value: 'kalaivani@gmail.com' } });
        fireEvent.change(getPassword(), { target: { value: '' } });
       
        fireEvent.focusOut(getPassword());
        
        await waitFor(() => {
            expect(getLoginButton()).toBeDisabled();
            expect(screen.getByText('Password is required')).toBeInTheDocument();
        });
    });
    it("Button must be disabled when only password exists and appropriate required error message must be shown", async() => {
        fireEvent.change(getEmail(), { target: { value: '' } });
        fireEvent.change(getPassword(), { target: { value: 'Kal1304*' } });
       
        fireEvent.focusOut(getEmail());
       
        await waitFor(() => {
            expect(getLoginButton()).toBeDisabled();
            expect(screen.getByText('Email is required')).toBeInTheDocument();
        });
    });
    it("Button must be disabled when only all fields are required", async() => {
        fireEvent.change(getEmail(), { target: { value: '' } });
        fireEvent.change(getPassword(), { target: { value: '' } });
        
        fireEvent.focusOut(getEmail());
        fireEvent.focusOut(getPassword());
        
        await waitFor(() => {
            expect(getLoginButton()).toBeDisabled();
            expect(screen.getByText('Email is required')).toBeInTheDocument();
            expect(screen.getByText('Password is required')).toBeInTheDocument();
        });
    });
    it("Button must be enabled when only all fields exist", async() => {
        fireEvent.change(getEmail(), { target: { value: 'vaishnavi@gmail.com' } });
        fireEvent.change(getPassword(), { target: { value: 'Vai1368*' } });
       
        await waitFor(() => {
            expect(getLoginButton()).not.toBeDisabled();
        });
    });
    it("Fields are required", () => {
        expect(getEmail()).toBeRequired();
        expect(getPassword()).toBeRequired();
    });
    it("Validation error when email is not valid", async() => {  
        fireEvent.change(getEmail(), { target: { value: 'koomalai' } });
        fireEvent.focusOut(getEmail());
    
        await waitFor(() => {
            expect(getLoginButton()).toBeDisabled();
            expect(screen.getByText('Email not valid')).toBeInTheDocument();
        });
    });
    it("Validation error when email does not match format", async() => {
        fireEvent.change(getEmail(), { target: { value: 'koomalai@acc.com' } });
        fireEvent.focusOut(getEmail());
    
        await waitFor(() => {
            expect(getLoginButton()).toBeDisabled();
            expect(screen.getByText('Email does not match format')).toBeInTheDocument();
        });
    });
    it("Validation error when password is not valid", async() => {
        fireEvent.change(getPassword(), { target: { value: 'Kal13048' } });
        fireEvent.focusOut(getPassword());
    
        await waitFor(() => {
            expect(getLoginButton()).toBeDisabled();
            expect(screen.getByText('Not valid password')).toBeInTheDocument();
        });
    });
    it("Validation error when password is less than 8 characters", async() => {
        fireEvent.change(getPassword(), { target: { value: 'Kal13*' } });
        fireEvent.focusOut(getPassword());
    
        await waitFor(() => {
            expect(getLoginButton()).toBeDisabled();
            expect(screen.getByText('Password must be 8 characters')).toBeInTheDocument();
        });
    });
    it("Validation error when password is more than 8 characters", async() => {
        fireEvent.change(getPassword(), { target: { value: 'Kal1304685*' } });
        fireEvent.focusOut(getPassword());
    
        await waitFor(() => {
            expect(getLoginButton()).toBeDisabled();
            expect(screen.getByText('Password must be 8 characters')).toBeInTheDocument();
        });
    });
    it("Should contain Already have an account text for user who already has an account", async() => {
        expect(screen.getByText('Do not have an account?')).toBeInTheDocument();
    });
    it("Should contain link to login page", async() => {
        expect(screen.getByRole('link', { name: /Register/i })).toBeInTheDocument();
    });
    it("Should contain copyright text at the end", async() => {
        expect(screen.getByText('My Medical Shop')).toBeInTheDocument();
    });
    it('should call handleLogin when user Email is not good on form submit', async () => {
        server.use(
            http.post(userLoginUrl, () => {
              return HttpResponse.json(false,{ 
                    headers: { "Content-Type":"application/json", "Accept":"application/json", "Access-Cross-Allow-Origin":"*"} 
                });
            }),
        );
    
        fireEvent.change(getEmail(), { target: { value: 'koomalai@gmail.com' } });
        fireEvent.change(getPassword(), { target: { value: 'Kal1304*' } });
      
        expect(getLoginButton()).not.toBeDisabled();
        await waitFor(()=>{
            fireEvent.click(getLoginButton());
        });
        expect(global.window.location.pathname).toBe('/login');
        expect(screen.getByRole('alert')).toHaveTextContent('Check if password or email exist');
    });
    it('should call handleLogin when user Password is not good on form submit', async () => {
        server.use(
            http.post(userLoginUrl, () => {
              return HttpResponse.json(false,{ 
                    headers: { "Content-Type":"application/json", "Accept":"application/json", "Access-Cross-Allow-Origin":"*"} 
                });
            }),
        );
    
        fireEvent.change(getEmail(), { target: { value: 'kashini@gmail.com' } });
        fireEvent.change(getPassword(), { target: { value: 'Koo1304*' } });
      
        expect(getLoginButton()).not.toBeDisabled();
        await waitFor(()=>{
            fireEvent.click(getLoginButton());
        });
        expect(global.window.location.pathname).toBe('/login');
        expect(screen.getByRole('alert')).toHaveTextContent('Check if password or email exist');
    });
    it('should call handleLogin when user Eamil and Password is not good on form submit', async () => {
        server.use(
            http.post(userLoginUrl, () => {
              return HttpResponse.json(false,{ 
                    headers: { "Content-Type":"application/json", "Accept":"application/json", "Access-Cross-Allow-Origin":"*"} 
                });
            }),
        );
    
        fireEvent.change(getEmail(), { target: { value: 'koomalai@gmail.com' } });
        fireEvent.change(getPassword(), { target: { value: 'Koo1304*' } });
      
        expect(getLoginButton()).not.toBeDisabled();
        await waitFor(()=>{
            fireEvent.click(getLoginButton());
        });
        expect(global.window.location.pathname).toBe('/login');
        expect(screen.getByRole('alert')).toHaveTextContent('Check if password or email exist');
    });
    it('should call handleLogin when there is no server', async () => {
        server.use(
            http.post(userLoginUrl, () => {
                return HttpResponse.error()
            }),
        );
        
        fireEvent.change(getEmail(), { target: { value: 'kalaivani@gmail.com' } });
        fireEvent.change(getPassword(), { target: { value: 'Kal1304*' } });
        
        expect(getLoginButton()).not.toBeDisabled();
        await waitFor(()=>{
            fireEvent.click(getLoginButton());
        });
        expect(global.window.location.pathname).toBe('/login');
        expect(screen.getByRole('alert')).toHaveTextContent('Cannot Login');
    });
    it('should call handleRegister with correct parameters on form submit and direct to homepage', async () => {
        fireEvent.change(getEmail(), { target: { value: 'kalaivani@gmail.com' } });
        fireEvent.change(getPassword(), { target: { value: 'Kal1304*' } });

        const payload={"userId":1,"firstName":"Kalaivani","lastName":"Chandra","email":"kalaivani@gmail.com","password":"$2a$10$KaWqRbUF0jEX0vnxE41U0OOzD8vPoD/pFQDDS0/fzksugAmx7wr1y","userType":"User","status":1,"createdOn":"2024-11-03T00:00:00","carts":[],"orders":[]}

        expect(getLoginButton()).not.toBeDisabled();
        await waitFor(()=>{
            fireEvent.click(getLoginButton());
        });
        expect(global.window.location.pathname).toBe('/homepage');
        expect(screen.getByRole('alert')).toHaveTextContent('Welcome to My Medical Shop');
        //expect(global.window.localStorage.getItem('user')).toBeDefined();
        expect(global.window.localStorage.getItem('user')).not.toBeNull();
        expect(global.window.localStorage.getItem('user')).not.toBeUndefined(); 
        //expect(localStorageNotUndefined).toBe(true);
    });
});

