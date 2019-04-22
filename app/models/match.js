export default (id, name, timestamp, organizatorId, matchSize, courtType, location, datetime, locationName, players = [], phoneNumber) => ({
    id: id,
    name: name,
    players: players,
    timestamp: timestamp,
    organizatorId: organizatorId,
    matchSize: matchSize,
    courtType: courtType,
    location: location,
    datetime: datetime,
    locationName: locationName,
    phoneNumber: phoneNumber
})