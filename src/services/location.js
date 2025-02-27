export const getLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("위치 정보를 가져올 수 없습니다."));
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      (err) => reject(new Error("위치 정보를 가져올 수 없습니다: " + err.message)),
      { enableHighAccuracy: true }
    );
  });
};
