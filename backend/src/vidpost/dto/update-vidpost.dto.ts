import { PartialType } from '@nestjs/mapped-types';
import { CreateVidpostDto } from './create-vidpost.dto.js';

export class UpdateVidpostDto extends PartialType(CreateVidpostDto) {}
