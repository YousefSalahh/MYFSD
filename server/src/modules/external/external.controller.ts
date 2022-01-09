import { Controller,Post, Body, UseGuards} from "@nestjs/common";
import { externalService } from "./external.service";
import { AuthGuard } from '@nestjs/passport';
import { externalDto } from "./external.dto";

@Controller("external")
export class ExternalController {
  constructor(
      private externalService: externalService,
     
    ) {}
 
  @UseGuards(AuthGuard('jwt'))
  @Post("/transferTransaction")
    CreateExternalTransfer(@Body()dto:externalDto):any {
     try{
          return this.externalService.createExternalTransfer(dto);
        } catch{
            (err) => console.log(err.message);
        }
    }

}
