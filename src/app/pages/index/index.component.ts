import { ActivatedRoute } from "@angular/router";
import { TemplateService } from "./../../template.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Meme } from "src/app/Templates";
import { Router } from "@angular/router";
import { Route } from "@angular/compiler/src/core";

@Component({
  selector: "app-index",
  templateUrl: "index.component.html"
})
export class IndexComponent implements OnInit, OnDestroy {
  isCollapsed = true;
  focus;
  focus1;
  focus2;
  date = new Date();
  pagination = 3;
  pagination1 = 1;
  memes: Meme[] = [];
  selectedFile: File;

  constructor(
    private templateService: TemplateService,
    private router: Router
  ) {}
  scrollToDownload(element: any) {
    element.scrollIntoView({ behavior: "smooth" });
  }
  ngOnInit() {
    let body = document.getElementsByTagName("body")[0];
    body.classList.add("index-page");

    this.templateService.fetchTemplates().subscribe(temp => {
      this.memes = temp.data.memes;
      this.templateService.templates = this.memes;
    });
  }
  ngOnDestroy() {
    let body = document.getElementsByTagName("body")[0];
    body.classList.remove("index-page");
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    this.startUpload();
  }

  startUpload() {
    this.templateService
      .customMemeUpload(this.selectedFile)
      .subscribe((res: any) => {
        if (res.status === "success") {
          this.router.navigateByUrl("/custommeme/" + res.name);
        } else {

        }
      });
  }
}
