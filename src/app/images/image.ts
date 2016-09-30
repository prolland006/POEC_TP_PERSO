/**
 * Created by Administrateur on 28/09/2016.
 */

export class Image {
  id: string;
  url: string;
  title: string;
  description: string;

  constructor({id, url, title, description}: {id?: string, url?: string, title?: string, description?: string}) {
    this.id = id;
    this.url = url;
    this.title = title;
    this.description = description;
  }

}
