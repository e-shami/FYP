from geopy import units, distance
from mezzanine.core.managers import CurrentSiteManager


class GeoManager(CurrentSiteManager):
    def near(self, latitude=None, longitude=None, distance_range=3):
        queryset = super(GeoManager, self).get_query_set()

        if not (latitude and longitude and distance_range):
            return queryset.none()

        latitude = float(latitude)
        longitude = float(longitude)
        distance_range = float(distance_range)

        rough_distance = units.degrees(arcminutes=units.nautical(kilometers=distance_range)) * 2

        queryset = queryset.filter(
            pickUpAddress__latitude__range=(
                latitude - rough_distance,
                latitude + rough_distance
            ),
            pickUpAddress__longitude__range=(
                longitude - rough_distance,
                longitude + rough_distance
            )
        )

        locations = []
        for location in queryset:
            if location.latitude and location.longitude:
                exact_distance = distance.distance(
                    (latitude, longitude),
                    (location.latitude, location.longitude)
                ).kilometers

                if exact_distance <= distance_range:
                    locations.append(location)

        queryset = queryset.filter(id__in=[l.id for l in locations])
        return queryset
