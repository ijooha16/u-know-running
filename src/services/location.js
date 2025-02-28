export const getLocation = async () => {
  try {
    if (!navigator.geolocation) {
      throw new Error("위치 정보를 가져올 수 없습니다.");
    }

    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        (err) => reject(new Error("위치 정보를 가져올 수 없습니다: " + err.message)),
        { enableHighAccuracy: true }
      );
    });
  } catch (error) {
    console.error("위치 정보 가져오기 실패:", error);
    throw error;
  }
};
