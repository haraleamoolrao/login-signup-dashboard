import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res
} from "@nestjs/common";
import type { Response } from "express";
import { AuthService } from "./auth.service";

type SignupBody = {
  name?: string;
  email?: string;
  password?: string;
};

type LoginBody = {
  email?: string;
  password?: string;
};

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signup")
  async signup(@Body() body: SignupBody, @Res() response: Response) {
    const name = body.name?.trim() ?? "";
    const email = body.email?.trim() ?? "";
    const password = body.password?.trim() ?? "";

    if (!name || !email || !password) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: "All fields are required." });
    }

    if (password.length < 6) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: "Password must be at least 6 characters." });
    }

    const result = await this.authService.signup(name, email, password);
    return response.status(result.status).json({ message: result.message });
  }

  @Post("login")
  async login(@Body() body: LoginBody, @Res() response: Response) {
    const email = body.email?.trim() ?? "";
    const password = body.password?.trim() ?? "";

    if (!email || !password) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: "Email and password are required." });
    }

    const result = await this.authService.login(email, password);

    if (!result.ok) {
      return response.status(result.status).json({ message: result.message });
    }

    response.cookie("auth_user", result.user.email, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 24 * 60 * 60 * 1000
    });

    return response.status(HttpStatus.OK).json({ message: "Login successful." });
  }

  @Post("logout")
  @HttpCode(HttpStatus.OK)
  logout(@Res() response: Response) {
    response.cookie("auth_user", "", {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 0
    });

    return response.json({ message: "Logged out successfully." });
  }
}
