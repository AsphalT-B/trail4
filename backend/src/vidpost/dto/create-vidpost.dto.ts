import { IsString,IsOptional } from "class-validator";

export class CreateVidpostDto {

    @IsString()
    title!:string;

    @IsOptional()
    @IsString()
    description!:string;

    @IsString()
    videoUrl!:string;

    @IsOptional()
    @IsString()
    thumbnailUrl!:string;

}
