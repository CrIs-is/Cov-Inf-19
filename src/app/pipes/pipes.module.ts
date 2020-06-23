import { NgModule } from '@angular/core';
import { TextFormatPipe } from './text-format.pipe';
import { FindDepPipe } from './find-dep.pipe';
@NgModule({
    imports:[],
    exports:[TextFormatPipe,FindDepPipe],
    declarations: [TextFormatPipe,FindDepPipe]
})

export class pipeModule {}