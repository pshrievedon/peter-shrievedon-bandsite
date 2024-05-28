class BandSiteApi {
  constructor(apiKey) {
    this.baseUrl = "https://unit-2-project-api-25c1595833b2.herokuapp.com/";
    this.apiKey = apiKey;
  }

  async getComments() {
    try {
      const response = await axios.get(
        this.baseUrl + "comments?api_key=" + this.apiKey
      );
      return response.data.sort(function (a, b) {
        return b.timestamp - a.timestamp;
      });
    } catch (error) {
      //GOTTA HAVE ERROR FOR EVERY ONE
      console.error("Error fetching comments:", error);
      throw error;
    }
  }

  async postComment(newComment) {
    try {
      const response = await axios.post(
        this.baseUrl + "comments?api_key=" + this.apiKey,
        newComment,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error posting comment:", error);
      throw error;
    }
  }

  async deleteComment(commentId) {
    try {
      const response = await axios.delete(
        this.baseUrl + "comments/" + commentId + "?api_key=" + this.apiKey
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting comment:", error);
      throw error;
    }
  }

  async getShows() {
    try {
      const response = await axios.get(
        this.baseUrl + "showdates?api_key=" + this.apiKey
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching shows:", error);
      throw error;
    }
  }
}

const apiKey = "482e58bf-fc9e-45ad-a62a-ca1296bde52c";
const bandSiteApi = new BandSiteApi(apiKey);
