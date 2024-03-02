var app = angular.module("myApp", ['ngRoute'])
    .config(function($routeProvider) {
        $routeProvider
        .when("/home", {
            templateUrl : "home.html",
        })
        .when("/signup", {
            templateUrl : "sign-up-form.html",
        })
        .when("/signin", {
            templateUrl : "sign-in-form.html",
        })
        .when("/detail", {
            templateUrl : "detail.html",
        })
        .when("/seat", {
            templateUrl : "seat.html",
        })
        .when("/cart", {
            templateUrl : "cart.html",
        })
        .otherwise({
            redirecto : "/home"
        })
    })
    .controller("myCtrl", function ($scope, $http, $location) {

        //đăng nhập
        $scope.username = "minhhoang25498@gmail.com";
        $scope.password = "123";

        $scope.formData = {}; // Đối tượng chứa dữ liệu từ biểu mẫu

        $scope.isLogin = false;
        $scope.submitForm = function() {
            if ($scope.formData.username === $scope.username 
                && $scope.formData.password === $scope.password ) {
                    $location.path("/home");
                    $scope.isLogin = true;
                }
                
        };

        //detail
        $scope.movieDetail;
        $scope.isDetail = false;
        $scope.setDetail = function(p) {
            $scope.movieDetail = p;
            $scope.isDetail = true;
        }
        $scope.setDetailNull = function() {
            $scope.movieDetail = null;
            $scope.isDetail = false;
        }
        $scope.setVideoSrc = function() {
            document.getElementById("md").src = "https://www.youtube.com/embed/" + $scope.movieDetail.href;
        }



        $scope.logout = function() {
            $scope.isLogin = false; 
            $scope.cartTickets = [];
        };
        
        //bỏ vé vào giỏ hàng
        $scope.cartTickets = [];
        $scope.setTicket = function(p) {
            $scope.cartTickets.push(p);
            console.log($scope.cartTickets[$scope.cartTickets.length - 1].title);
        }
        //xóa vé 
        $scope.removeTicket = function(index) {
            $scope.cartTickets.splice(index, 1);
        }

        //choose ticket
        $scope.day;
        $scope.city;
        $scope.cinemaName;
        $scope.type;
        $scope.time;
        $scope.getDay = function(d, index) {
            $scope.day = d;
        }
        $scope.getCity = function(c) {
            $scope.city = c;
            
        }
        $scope.getCinemaName = function(c) {
            $scope.cinemaName = c;
            
        }
        $scope.getType = function(t) {
            $scope.type = t;
            
        }
        $scope.getTime = function(t) {
            $scope.time = t;
            
        }
        //choose seat
        $scope.arrSeat = [];
        $scope.pricePerSeat = 0.0;
        $scope.pricePerCombo = 0.0;
        $scope.total = 0;

        $scope.chooseSeat = function(e) {
            var seatNumber = e.currentTarget.innerHTML;
            
            if ($scope.arrSeat.length !== 0) { //kiểm tra phần tử của mảng
                if ($scope.arrSeat[0].substr(0, 1) !== seatNumber.substr(0, 1)) { //khác hàng
                    alert("Ngồi khác hàng khó 8 lắm!");
                } else {
                    if ($scope.arrSeat.includes(seatNumber)) {//nếu đã có ghế
                        if (seatNumber.substr(0, 1) === "D") { //Nếu là ghế D
                            if (seatNumber.substr(1, 1) % 2) {//nếu là số lẻ
                                let s1 = seatNumber.substr(1, 1); //lấy số 1 
                                let s2 = parseInt(s1, 10) + 1;    //để có số 2
                                $scope.arrSeat = $scope.arrSeat.filter(function(seat) {
                                    let bool = seat !== ("D" + s1);
                                    if (!bool) {
                                        $scope.arrSeat.splice($scope.arrSeat.indexOf(("D" + s2)), 1);
                                        e.currentTarget.classList.toggle("seatColor");
                                        e.currentTarget.nextElementSibling.classList.toggle("seatColor");
                                        return bool;
                                    }
                                    return true;
                                });
                            } else {
                                let s2 = seatNumber.substr(1, 1); //lấy số 2
                                let s1 = parseInt(s2, 10) - 1;    //để có số 1
                                $scope.arrSeat = $scope.arrSeat.filter(function(seat) {
                                    let bool = seat !== ("D" + s1);
                                    if (!bool) {
                                        $scope.arrSeat.splice($scope.arrSeat.indexOf(("D" + s2)), 1);
                                        e.currentTarget.classList.toggle("seatColor");
                                        e.currentTarget.previousElementSibling.classList.toggle("seatColor");
                                        return bool;
                                    }
                                    return true;
                                });
                            }
                            $scope.pricePerSeat -= 160000;
                        } else { //ghế thường
                            $scope.arrSeat = $scope.arrSeat.filter(function(seat) {
                                let bool = seat !== seatNumber;
                                if (!bool) {
                                    e.currentTarget.classList.toggle("seatColor");
                                    $scope.pricePerSeat -= 75000;
                                }
                                return bool;
                            }); //false (A1 !== A1) => bỏ ra khỏi mảng
                        }
                    } else {//Nếu ghế chưa có trong mảng, thêm vào
                        //Mà là D
                        if (seatNumber.substr(0, 1) === "D") {
                            if (seatNumber.substr(1, 1) % 2) {
                                let s1 = seatNumber.substr(1, 1);
                                let s2 = parseInt(s1, 10) + 1;
                                $scope.arrSeat.push("D" + s1);
                                $scope.arrSeat.push("D" + s2);
                                e.currentTarget.classList.toggle("seatColor");
                                e.currentTarget.nextElementSibling.classList.toggle("seatColor");
                            } else {
                                let s2 = seatNumber.substr(1, 1);
                                let s1 = parseInt(s2, 10) - 1;
                                $scope.arrSeat.push("D" + s1);
                                $scope.arrSeat.push("D" + s2);
                                e.currentTarget.classList.toggle("seatColor");
                                e.currentTarget.previousElementSibling.classList.toggle("seatColor");
                            }
                            $scope.pricePerSeat += 160000;
                        } else { //ghế thường
                                $scope.arrSeat.push(seatNumber);
                                e.currentTarget.classList.toggle("seatColor");
                                $scope.pricePerSeat += 75000;
                        }
                    }
                }
            } else {
                if (seatNumber.substr(0, 1) === "D") {
                    if (seatNumber.substr(1, 1) % 2) {
                        let s1 = seatNumber.substr(1, 1);
                        let s2 = parseInt(s1, 10) + 1;
                        $scope.arrSeat.push("D" + s1);
                        $scope.arrSeat.push("D" + s2);
                        e.currentTarget.classList.toggle("seatColor");
                        e.currentTarget.nextElementSibling.classList.toggle("seatColor");
                    } else {
                        let s2 = seatNumber.substr(1, 1);
                        let s1 = parseInt(s2, 10) - 1;
                        $scope.arrSeat.push("D" + s1);
                        $scope.arrSeat.push("D" + s2);
                        e.currentTarget.classList.toggle("seatColor");
                        e.currentTarget.previousElementSibling.classList.toggle("seatColor");
                    }
                    $scope.pricePerSeat += 160000;
                } else {
                    $scope.arrSeat.push(seatNumber);
                    e.currentTarget.classList.toggle("seatColor");
                    $scope.pricePerSeat += 75000;
                }
            }

            $scope.total = $scope.pricePerSeat + $scope.pricePerCombo;
        }
        /*//1 ghế thì được
        $scope.chooseSeat = function(e) {

            e.currentTarget.classList.toggle("seatColor");

            var seatNumber = e.currentTarget.innerHTML;
            // Kiểm tra xem ghế đã được chọn trước đó hay chưa
            var index = $scope.arrSeat.indexOf(seatNumber);

            if (index === 0)
                $scope.arrSeat.splice(index, 1);
            else
                $scope.arrSeat.push(seatNumber);
        }
        */
        
        //combo
        $scope.isCombo = false;
        $scope.ComboTotal = 0;
        $scope.editIndexCombo = function (e, index) {
            var el = e.currentTarget.innerHTML;
            //current comboIndex parse Int
            let i = document.getElementsByName("comboIndex")[index].value;
            let n = parseInt(i, 10);
            //price
            let p = document.getElementsByName("comboPrice")[index].innerText;
            if (el.includes("+")) {    
                document.getElementsByName("comboIndex")[index].value = n + 1;
                $scope.pricePerCombo += parseInt(p, 10);
            } else {
                if (i != 0) {
                    document.getElementsByName("comboIndex")[index].value = n - 1;
                    $scope.pricePerCombo -= parseInt(p, 10);
                }
            }
            //take again number comboIndex after change
            let i2 = document.getElementsByName("comboIndex")[index].value;
            let s = (i2 * $scope.arrCombo[index].price); //.toFixed(3) - hiển thị chưa đúng
            document.getElementsByName("comboTotal")[index].innerHTML = s + ",00 đ";

            $scope.total = $scope.pricePerSeat + $scope.pricePerCombo;
        }
        $scope.showComboDescripe = function() {
            for (let i = 0; i < $scope.arrCombo.length; i++)
                document.getElementsByName("comboDescripe")[i].innerHTML = $scope.arrCombo[i].descripe;
        }
        

        $scope.nextStep = false;

        $scope.next = function () {
            if ($scope.nextStep)
                $scope.nextStep = false;
            else
                $scope.nextStep = true;
        }

        $scope.payment = function() {
            alert("Maked payment successfully!");
        }

        $scope.arrMenu = [];
        $scope.arrCarousel = [];
        $scope.arrEvent1 = [];
        $scope.arrEvent2 = [];
        $scope.arrNewMovie = [];
        $scope.arrType = [];
        $scope.startEvent1 = 0;
        $scope.startEvent2 = 0;
        $scope.startNewMovie = 0;
        $scope.limitEvent = 4;
        
        $scope.arrCombo = [];
        
        $scope.showMovie = false;

        $http.get("json/data.json").then(
            function(res) {
                $scope.arrMenu = res.data.menu;
                $scope.arrCarousel = res.data.carousel;
                $scope.arrEvent1 = res.data.event1;  
                $scope.arrEvent2 = res.data.event2;
                $scope.arrNewMovie = res.data.newMovie;
                $scope.arrType = res.data.type;
                $scope.arrCombo = res.data.combo;
            },
            function(res) {
                console.log("Can not find data file!");
            }
        );

        
        //event
        $scope.moveEvent = function (obj, n) {
            if (obj == 'evt1') {
                if (n === 1) {
                    if ($scope.startEvent1 != 0)
                        $scope.startEvent1--;
                } else
                    if ($scope.startEvent1 != $scope.arrEvent1.length - $scope.limitEvent)
                        $scope.startEvent1++;
            } else if (obj == 'evt2') {
                if (n === 1) {
                    if ($scope.startEvent2 != 0)
                        $scope.startEvent2--;
                } else
                    if ($scope.startEvent2 != $scope.arrEvent2.length - $scope.limitEvent)
                        $scope.startEvent2++;
            } else if (obj == 'newMovie') {
                if (n === 1) {
                    if ($scope.startNewMovie != 0)
                        $scope.startNewMovie--;
                } else
                    if ($scope.startNewMovie != $scope.arrNewMovie.length - $scope.limitEvent)
                        $scope.startNewMovie++;
            }
        }

        $scope.checkArrEvent1 = false;
        if ($scope.arrEvent1 > $scope.limitEvent)
            $scope.checkArrEvent1 = true;
        
        $scope.checkEvent1 = true;
        $scope.checkEvent2 = false;
        $scope.checkEvent = function (btn) {
            if (btn == 1) {
                $scope.checkEvent1 = true;
                $scope.checkEvent2 = false;
            }
            if (btn == 2) {
                $scope.checkEvent1 = false;
                $scope.checkEvent2 = true;
            }
        }
    });