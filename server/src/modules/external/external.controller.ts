import { Controller,Post, Body, UseGuards} from "@nestjs/common";
import { ExternalService } from "./external.service";
import { AuthGuard } from '@nestjs/passport';
import { externalDto } from "./dto/external.dto";
import { ExternalDto } from "./dto/ExternalDto";

@Controller("external")
export class ExternalController {
  constructor(
      private externalService: ExternalService,
     
    ) {}
 
 // @UseGuards(AuthGuard('jwt'))
  @Post("/SendingExternalTransaction")
    CreateExternalTransfer(@Body()request: ExternalDto ):any {
     try{
          return this.externalService.createExternalTransaction(request );
        } catch (err) {
              console.log(err.message);
        }
    }

    @Post("/transfer")
    recieveExternalTransfer(@Body()dto:externalDto):any {
     try{
          return this.externalService.recieveExternalTransfer(dto);
        } catch(err){
             console.log(err.message);
        }
    }

  }

