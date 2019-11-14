import { Meme } from "src/app/Templates";
import { Templates, Response } from "./Templates";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class TemplateService {
  templates: Meme[] = [];
  templateUrl = "https://api.imgflip.com/";

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  };

  rapidApi = {
    headers: new HttpHeaders({
      "x-rapidapi-host": "ronreiter-meme-generator.p.rapidapi.com",
      "x-rapidapi-key": "3CbftiFEPCmshryjmKmOeKNNnD6gp1QoHOVjsngq2kXOynFU5F"
    })
  };

  

  constructor(private http: HttpClient) {}

  fetchTemplates(): Observable<Templates> {
    return this.http.get<Templates>(this.templateUrl + "get_memes");
  }

  generateMeme(id: string, text0: string, text1: string): Observable<Response> {
    let body = new HttpParams();
    body = body.set("template_id", id);
    body = body.set("username", "AmitWani");
    body = body.set("text0", text0);
    body = body.set("text1", text1);
    body = body.set("password", "123456");

    return this.http.post<Response>(this.templateUrl + "caption_image", body, {
      headers: new HttpHeaders({
        "Content-Type": "application/x-www-form-urlencoded"
      })
    });
  }

  customMemeUpload(file: File) {
    console.log(file);

    const uploadData = new FormData();
    uploadData.append("image", file);
    uploadData.append("content-type", "application/octet-stream");

    return this.http.post(
      "https://ronreiter-meme-generator.p.rapidapi.com/images",
      uploadData,
      this.rapidApi
    );
  }

  generateCustomMeme(meme: string, text0: string, text1: string) {
    let body = new HttpParams();
    body = body.set("meme", meme);
    body = body.set("top", text0);
    body = body.set("bottom", text1);
    return this.http.get(
      "https://ronreiter-meme-generator.p.rapidapi.com/meme",
      {
        headers: new HttpHeaders({
          "x-rapidapi-host": "ronreiter-meme-generator.p.rapidapi.com",
          "x-rapidapi-key": "3CbftiFEPCmshryjmKmOeKNNnD6gp1QoHOVjsngq2kXOynFU5F"
        }),
        params: body,
        responseType: "blob"
      },
      
    );
  }
}
