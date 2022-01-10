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
  @Post("/SendingExternalTransaction")
    CreateExternalTransfer(@Body()request: any,dto : externalDto ):any {
     try{
          return this.externalService.createExternalTransaction(request , dto);
        } catch{
            (err) => console.log(err.message);
        }
    }

    @Post("/RecievingExternalTransaction")
    recieveExternalTransfer(@Body()dto:externalDto):any {
     try{
          return this.externalService.recieveExternalTransfer(dto);
        } catch{
            (err) => console.log(err.message);
        }
    }


}
