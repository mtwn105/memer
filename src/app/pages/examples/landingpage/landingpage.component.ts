import { Meme } from "src/app/Templates";
import { TemplateService } from "./../../../template.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl, FormBuilder } from "@angular/forms";

@Component({
  selector: "app-landingpage",
  templateUrl: "landingpage.component.html"
})
export class LandingpageComponent implements OnInit, OnDestroy {
  meme: Meme = { id: "", name: "", box_count: 0, height: 0, url: "", width: 0 };
  memes: Meme[] = [];
  isCollapsed = true;
  memeForm: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private templateService: TemplateService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.memeForm = this.formBuilder.group({
      text1: new FormControl(""),
      text2: new FormControl("")
    });

    this.route.paramMap.subscribe(params => {
      this.templateService.fetchTemplates().subscribe(temp => {
        this.memes = temp.data.memes;
        this.templateService.templates = this.memes;
        this.meme = this.templateService.templates.find(
          meme => meme.id === params.get("id")
        );

        console.log(this.meme);
      });
    });

    const body = document.getElementsByTagName("body")[0];
    body.classList.add("landing-page");
  }
  ngOnDestroy() {
    const body = document.getElementsByTagName("body")[0];
    body.classList.remove("landing-page");
  }

  onSubmit() {
    this.templateService
      .generateMeme(
        this.meme.id,
        this.memeForm.value["text1"],
        this.memeForm.value["text2"]
      )
      .subscribe((res) => {
        if (res.success === true) {
          window.open(res.data.url, "_blank");
        }
      });
  }
}
