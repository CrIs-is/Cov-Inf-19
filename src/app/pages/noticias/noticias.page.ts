import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../servicios/data.service';
import { Noticia } from '../../models/noticia.interface';
import { ActivatedRoute } from '@angular/router';
import { ModalPage } from 'src/app/components/modal/modal.page';
import { ModalController, IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.page.html',
  styleUrls: ['./noticias.page.scss'],
})
export class NoticiasPage implements OnInit {

  @ViewChild('slide',{static:true}) slide:IonSlides;

  slideOpts = {
    autoplay: true,
    initialSlide: 10,
    speed: 500,
    on: {
      beforeInit() {
        const swiper = this;
        swiper.classNames.push(`${swiper.params.containerModifierClass}fade`);
        const overwriteParams = {
          slidesPerView: 1,
          slidesPerColumn: 1,
          slidesPerGroup: 1,
          watchSlidesProgress: true,
          spaceBetween: 0,
          virtualTranslate: true,
        };
        swiper.params = Object.assign(swiper.params, overwriteParams);
        swiper.params = Object.assign(swiper.originalParams, overwriteParams);
      },
      setTranslate() {
        const swiper = this;
        const { slides } = swiper;
        for (let i = 0; i < slides.length; i += 1) {
          const $slideEl = swiper.slides.eq(i);
          const offset$$1 = $slideEl[0].swiperSlideOffset;
          let tx = -offset$$1;
          if (!swiper.params.virtualTranslate) tx -= swiper.translate;
          let ty = 0;
          if (!swiper.isHorizontal()) {
            ty = tx;
            tx = 0;
          }
          const slideOpacity = swiper.params.fadeEffect.crossFade
            ? Math.max(1 - Math.abs($slideEl[0].progress), 0)
            : 1 + Math.min(Math.max($slideEl[0].progress, -1), 0);
          $slideEl
            .css({
              opacity: slideOpacity,
            })
            .transform(`translate3d(${tx}px, ${ty}px, 0px)`);
        }
      },
      setTransition(duration) {
        const swiper = this;
        const { slides, $wrapperEl } = swiper;
        slides.transition(duration);
        if (swiper.params.virtualTranslate && duration !== 0) {
          let eventTriggered = false;
          slides.transitionEnd(() => {
            if (eventTriggered) return;
            if (!swiper || swiper.destroyed) return;
            eventTriggered = true;
            swiper.animating = false;
            const triggerEvents = ['webkitTransitionEnd', 'transitionend'];
            for (let i = 0; i < triggerEvents.length; i += 1) {
              $wrapperEl.trigger(triggerEvents[i]);
            }
          });
        }
      },
    }}
  private data: Array<Noticia>[] = null;
  private desorder: Array<Noticia>[] = null;

  constructor( private service: DataService,public ActRoute: ActivatedRoute, private modal: ModalController) { 
  
  }

  ngOnInit() {
    this.getNoticias();
  }
  
  //Obteniendo noticias
  getNoticias(){
    this.service.getNoticesCovidColombia().subscribe(
      (data)=> {
        this.data = data;
        //this.desorder = data;
        //this.desorder.sort(function() { return Math.random() - 0.5})
      },
      (error)=> {
        console.log(error)
      },
      ()=> {console.log("completado")},
    )
  }

  //Optimizar el ngFor
  trackByFn(index: number,noticia:Noticia){
    return index;
  }

  //forma optimizada de eliminar un item
  deleteElement(item){
      var i = this.data.indexOf( item );
      i !== -1 && this.data.splice( i, 1 );
  }

  //Ventana modal
  async presentModal(index) {
    const modal = await this.modal.create({
      component: ModalPage,
      cssClass: 'animate__animated animate__fadeInUpBig',
      swipeToClose: true,
      backdropDismiss: true,
      //presentingElement: this.routerOutlet.nativeEl,
      mode:'ios',
      componentProps: {
        'id': index,
      }
    });
    return await modal.present();
  }
  goToNext(){
    this.slide.slideNext();
  }

  goToPrev(){
    this.slide.slidePrev();
  }
 

}
