import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private jwtService: JwtService,
    ) {}

    async register(username: string, password: string): Promise<User> {
        if (!username || !password) {
            throw new Error('Username y password son requeridos');
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new this.userModel({ username, password: hashedPassword });
        return newUser.save();
    }

    async login(username: string, password: string): Promise<{ access_token: string }> {
        const user = await this.userModel.findOne({ username });
        if (!user) throw new UnauthorizedException('Usuario no encontrado');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new UnauthorizedException('Contraseña incorrecta');

        const payload = { username: user.username, sub: user._id };
        return {
        access_token: this.jwtService.sign(payload),
        };
    }
}


