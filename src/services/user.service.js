import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL;

export const getPlaceList = (page) => {
  return axios
    .get(baseUrl + "/?latitude=37.5441270&longitude=126.9667812&page=" + page)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error.response) {
        // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // 요청이 이루어 졌으나 응답을 받지 못했습니다.
        console.log(error.request);
      } else {
        // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
        console.log("Error", error.message);
      }
      console.log(error.config);
    });
};

export const getPlaceDetail = (id) => {
  return axios
    .get(baseUrl + "/" + id)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getPlaceDetailCharger = (id) => {
  return axios
    .get(baseUrl + "/" + id + "/charger")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getReview = (id, sort) => {
  return axios
    .get(baseUrl + "/" + id + "/review?sort=" + sort)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getReviewAverage = (id) => {
  return axios
    .get(baseUrl + "/" + id + "/review/average")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error.response) {
        // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
        console.log(error.response.data);
        // console.log(error.response.status);
        // console.log(error.response.headers);
      } else if (error.request) {
        // 요청이 이루어 졌으나 응답을 받지 못했습니다.
        console.log(error.request);
      } else {
        // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
        console.log("Error", error.message);
      }
      // console.log(error.config);
    });
};

export const postReview = (userType, locationId, detail, star) => {
  return axios
    .post(baseUrl + "/review", {
      userType: userType,
      locationId: locationId,
      detail: detail,
      star: star,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error.response) {
        // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // 요청이 이루어 졌으나 응답을 받지 못했습니다.
        console.log(error.request);
      } else {
        // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
        console.log("Error", error.message);
      }
      console.log(error.config);
    });
};

export const postReviewRecommend = (reviewId) => {
  return axios
    .post(baseUrl + "/review/recommend", {
      reviewId: reviewId,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error.response) {
        // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // 요청이 이루어 졌으나 응답을 받지 못했습니다.
        console.log(error.request);
      } else {
        // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
        console.log("Error", error.message);
      }
      console.log(error.config);
    });
};

export const postReviewDiscourage = (reviewId) => {
  return axios
    .post(baseUrl + "/review/discourage", {
      reviewId: reviewId,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error.response) {
        // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // 요청이 이루어 졌으나 응답을 받지 못했습니다.
        console.log(error.request);
      } else {
        // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
        console.log("Error", error.message);
      }
      console.log(error.config);
    });
};
