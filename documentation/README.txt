Valet Assistant
Author: Ben Stenberg
Date: 4/25/2023

Description:
    This application is used to manage a valet service. Users (valet employees) can enter parked cars
    and clients can view the status and request that their vehicle be returned to them by using their phone number.

Tech Stack:
    This application is built using the MEAN stack.

Changes From Initial Proposal:
    I now use the Car Data API by Principal APIs on rapidapi.com.
    My initial choice of API ended up being too limited to be useful for this project, but my new API
    choice still accomplishes the exact same purpose of populating make and model dropdowns.
    API url: https://rapidapi.com/principalapis/api/car-data/

Limitations:
    I am using the free tier of the Car Data API, which restricts me to 1000 requests per month. This, however, should
    be reasonable as this is simply a school project. The api also limits me to 1 request per second, requiring me to 
    add some forced 1 second delays in my code, making adding a new vehicle entry slightly slower than desirable.