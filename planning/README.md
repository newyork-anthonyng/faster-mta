# Routing
* `/`
    * Show list of all subway lines
    * ![Picture of home route](./home.png)
* `/train/:train-line`
    * Show list of all subway stations for `train-line`
    * ![Picture of train-line route](./train.png)
* `/train/:train-line/:station`
    * Show list of subway times for `train-line` at `station`
    * ![Picture of subway times](./subway-times.png)
* `/map/subway`
    * Show PDF of Subway Map
    * This should be available offline
    * ![Picture of subway map](./subway-map.png)