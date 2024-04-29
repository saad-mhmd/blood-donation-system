// add hover in every list item

let list = document.querySelectorAll(".navigation li")

function activeLink() {
    list.forEach((item) => {
        item.classList.remove("hovered");
        this.classList.add("hovered")
    })
}

list.forEach(item =>
    item.addEventListener('mouseover', activeLink
    ))

// menu toggle

let navigation = document.querySelector('.navigation'),
    toggle = document.querySelector(".toggle"),
    main = document.querySelector(".main")

toggle.onclick = function () {
    navigation.classList.toggle("active")
    main.classList.toggle('active')
}


function countUserDocuments() {
    var userCollectionRef = collection(db,"users");
    userCollectionRef.getDocs(db).then(function(querySnapshot) {
      var count = querySnapshot.size;
      console.log("Number of documents in 'user' collection:", count);
    }).catch(function(error) {
      console.error("Error getting documents: ", error);
    });
  }
// chart js integration

const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'polarArea',
    data: {
        labels: ['aljanoub', 'Beirut', 'shmal', 'mount-lebanon', 'bekaa', 'test'],
        datasets: [{
            label: 'users',
            data: [20, 10, 24, 30,32,10],
            backgroundColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true
    }
});


const ctx2 = document.getElementById('myChart2').getContext('2d');
const myChart2 = new Chart(ctx2, {
    type: 'bar',
    data: {
        labels: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+','AB-'],
        datasets: [{
            label: 'Bloods Bank',
            data: [10, 20, 10, 20, 25, 0, 30,9],
            backgroundColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 99, 132, 1)',

            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true
    }
});

