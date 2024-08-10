import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import KeenSlider, { KeenSliderInstance } from "keen-slider"
import { NgClass, NgForOf, NgIf, NgOptimizedImage, NgStyle } from "@angular/common";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgClass,
    NgForOf,
    NgIf,
    NgStyle,
    NgOptimizedImage
  ],
  templateUrl: './home.component.html',
  styleUrls: [
    "../../../../node_modules/keen-slider/keen-slider.min.css",
    './home.component.scss'
  ]
})
export class HomeComponent implements AfterViewInit, OnDestroy {

  @ViewChild("sliderRef") sliderRef: ElementRef<HTMLElement> | undefined;

  currentSlide: number = 0;
  images: String[] = [
    "assets/1.jpg",
    "assets/2.jpg",
    "assets/3.jpg",
    "assets/4.jpg",
  ]
  slider: KeenSliderInstance | null = null;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    if (this.sliderRef) {
      this.slider = new KeenSlider(
        this.sliderRef.nativeElement,
        {
          initial: this.currentSlide,
          loop: true,
          slideChanged: (s) => {
            this.currentSlide = s.track.details.rel
          }
        },
        [
          (slider) => {
            this.handleMouseEvents(slider);
          }
        ]
      )
      this.cdr.detectChanges();
    }
  }

  ngOnDestroy() {
    if (this.slider) this.slider.destroy()
  }

  private handleMouseEvents(slider: any): void {
    let timeout: any;
    let mouseOver: boolean = false;

    function clearNextTimeout() {
      clearTimeout(timeout)
    }

    function nextTimeout() {
      clearTimeout(timeout)
      if (mouseOver) return
      timeout = setTimeout(() => {
        slider.next()
      }, 2000)
    }

    slider.on("created", () => {
      slider.container.addEventListener("mouseover", () => {
        mouseOver = true
        clearNextTimeout()
      })
      slider.container.addEventListener("mouseout", () => {
        mouseOver = false
        nextTimeout()
      })
      nextTimeout()
    })
    slider.on("dragStarted", clearNextTimeout);
    slider.on("animationEnded", nextTimeout);
    slider.on("updated", nextTimeout);
  }
}
