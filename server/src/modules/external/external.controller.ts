import { Controller,Post, Body, UseGuards} from "@nestjs/common";
import { ExternalService } from "./external.service";
import { AuthGuard } from '@nestjs/passport';
import { externalDto } from "./external.dto";

@Controller("external")
export class ExternalController {
  constructor(
      private externalService: ExternalService,
     
    ) {}
 
  @UseGuards(AuthGuard('jwt'))
  @Post("/transferTransaction")
    CreateExternalTransfer(@Body()dto:externalDto):any {
     try{
          return this.externalService.recieveExternalTransfer(dto);
        } catch{
            (err) => console.log(err.message);
        }
    }

}
