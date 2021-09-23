module.exports = class TransformData {
  convert(data) {
    const { latitude, longitude } = data.body
    const latLng = {
      location: {
        latLng: {
          lat: latitude,
          lng: longitude,
        },
      },
    }
    return latLng
  }
}
