import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    AppModule,          // Import the main AppModule
    ServerModule        // Add ServerModule for server-side rendering
  ],
  bootstrap: [AppComponent] // Bootstrap the root component
})
export class AppServerModule {}
