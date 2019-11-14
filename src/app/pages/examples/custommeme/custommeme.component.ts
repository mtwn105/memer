import { Component, OnInit } from "@angular/core";
import { Meme } from "src/app/Templates";
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { TemplateService } from "src/app/template.service";

@Component({
  selector: "app-custommeme",
  templateUrl: "./custommeme.component.html",
  styleUrls: ["./custommeme.component.scss"]
})
export class CustommemeComponent implements OnInit {
  meme: Meme = { id: "", name: "", box_count: 0, height: 0, url: "", width: 0 };
  name: string = "";
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
      this.name = params.get("name");
      console.log(this.name);
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
      .generateCustomMeme(
        this.name,
        this.memeForm.value["text1"],
        this.memeForm.value["text2"]
      )
      .subscribe((res: any) => {
        console.log(res);
       
        window.open(URL.createObjectURL(res), "_blank");
      });
  }
}
