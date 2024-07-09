import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { beforeEach, describe, expect, it } from "vitest";
import App from "../../../App";

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
    it("Should navigate to login page when Sign In link is clicked", async() => {
        expect(screen.getByRole('link', { name: /Sign In/i })).toBeInTheDocument();
	    fireEvent.click(screen.getByRole('link', { name: /Sign In/i }));
        expect(global.window.location.pathname).toBe('/login');
    });
});