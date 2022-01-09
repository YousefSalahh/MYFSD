import { Controller,Post, Body, UseGuards} from "@nestjs/common";
import { ExternalService } from "./external.service";
import { AuthGuard } from '@nestjs/passport';
import { externalDto } from "./dto/external.dto";

@Controller("external")
export class ExternalController {
  constructor(
      private externalService: ExternalService,
     
    ) {}
 
 // @UseGuards(AuthGuard('jwt'))
  @Post("/transferTransaction")
    CreateExternalTransfer(@Body()authtoken:string , port:number, receiverAccNumber:string , amount:number , description:string ,accountID:number ):any {
     try{
          return this.externalService.createExternalTransaction(authtoken , port ,receiverAccNumber , amount , description,accountID);
        } catch{
            (err) => console.log(err.message);
        }
    }

    @Post("/transferTransaction")
    recieveExternalTransfer(@Body()dto:externalDto):any {
     try{
          return this.externalService.recieveExternalTransfer(dto);
        } catch{
            (err) => console.log(err.message);
        }
    }


}
