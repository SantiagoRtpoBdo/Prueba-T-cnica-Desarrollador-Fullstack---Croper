import { IsString, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @IsString()
    descripcion?: string;

    @IsNumber()
    @Min(1)
    precio: number;

    @IsString()
    categoria?: string;
}
