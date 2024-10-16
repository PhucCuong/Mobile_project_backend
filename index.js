const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());

// Kết nối MongoDB
mongoose
  .connect(
    "mongodb+srv://minhvu:eYamH53JaqV8UpfA@backendb.cnqmg.mongodb.net/myDatabase?retryWrites=true&w=majority&appName=BackenDB",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((error) => {
    console.error("Connection failed!", error);
  });
// Tạo schema cho bãi biển
const beachSchema = new mongoose.Schema({
  location: String,
  name: String,
  address: String,
  image: String,
  description: String,
  interact: [
    {
      likes: Number,
      shares: Number,
      reviews: Number,

    }
  ]
});

// Tạo schema cho nhà hàng
const restaurantSchema = new mongoose.Schema({

  location: String,
  name: String,
  address: String,
  total_tables: Number,
  image: String,
  description: String,
  phone: String,
  noithat: String,
  foods: [
    {
      name: String,
      price: String,
    }
  ],
  tables: [
    {
      tableName: String,
      available: Boolean
    }
  ],
  interact: [
    {
      likes: Number,
      shares: Number,
      reviews: Number,

    }
  ]

});

// Tạo schema cho khách sạn
const hotelSchema = new mongoose.Schema({
  location: String,
  name: String,
  address: String,
  total_rooms: Number,
  image: String,
  description: String,
  phone: String,
  interact: Number,
  noithat: String,
  rooms: [
    {
      name_room: String,
      available_room: Boolean,
      price: String
    }
  ],
  interact: [
    {
      likes: Number,
      shares: Number,
      reviews: Number,

    }
  ]
});

const coffeeShopSchema = new mongoose.Schema({
  location: String,
  name: String,
  address: String,
  total_tables: Number,
  image: String,
  description: String,
  phone: String,
  interact: Number,
  noithat: String,
  drinks: [
    {
      name_drink: String,
      price: String,
    }
  ],
  tables: [
    {
      tableName: String,
      available: Boolean
    }
  ],
  interact: [
    {
      likes: Number,
      shares: Number,
      reviews: Number,

    }
  ]
});

const customerSchema = new mongoose.Schema({
  avatar: String,
  user_name: String,
  password: String,
  phone_number: String,
  location: String,
  gender: String,
});

// Tạo schema cho tourlist
const tourlistSchema = new mongoose.Schema({
  img: String,
  tourist_name: String,
  location: String,
  distance: String,
  description: String,
  price: String,
  benerfics: [String],
  like_user: [
    {
      avatar: String,
      user_name: String
    }
  ]
});

// Tạo model từ schema
const Restaurant = mongoose.model('Restaurant', restaurantSchema);
const Hotel = mongoose.model('Hotel', hotelSchema);
const CoffeeShop = mongoose.model('CoffeeShop', coffeeShopSchema);
const Customer = mongoose.model('Customer', customerSchema);
const Beach = mongoose.model('Beach', beachSchema)
const Tourlist = mongoose.model('Tourlist', tourlistSchema)

// Endpoint để lấy danh sách tất cả các địa điểm
app.get('/Restaurant', async (req, res) => {
  try {
    const allRestaurant = await Restaurant.find();
    res.json(allRestaurant);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/Hotel', async (req, res) => {
  try {
    const allHotel = await Hotel.find();
    res.json(allHotel);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/CoffeeShop', async (req, res) => {
  try {
    const allCoffeeShop = await CoffeeShop.find();
    res.json(allCoffeeShop);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/customer', async (req, res) => {
  try {
    const allCustomer = await Customer.find();
    res.json(allCustomer);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/Beach', async (req, res) => {
  try {
    const allBeach = await Beach.find();
    res.json(allBeach);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/customer/:id', async (req, res) => {
  try {
    const { id } = req.params;  // Lấy user_name từ URL
    const customer = await Customer.findOne({ _id: id }).select('-password');  // Tìm customer có user_name bằng với user_name

    if (customer) {
      res.json(customer);  // Nếu tìm thấy, trả về dữ liệu customer
    } else {
      res.status(404).send('Customer not found');  // Nếu không tìm thấy, trả về 404
    }
  } catch (error) {
    res.status(500).send(error);  // Xử lý lỗi
  }
});

// xử lí nhận tourlist
app.get('/tourlist', async (req, res) => {
  try {
    const allTourList = await Tourlist.find();
    res.json(allTourList);
  } catch (error) {
    res.status(500).send(error);
  }
});

// xử lí get detail tourlist
app.get('/tourlist/:id', async (req, res) => {
  const tourlist_id = req.params.id
  try {
    const detailTourlist = await Tourlist.findOne({_id: tourlist_id});
    res.json(detailTourlist);
  } catch (error) {
    res.status(500).send(error);
  }
});

// xử lí đăng nhập
app.post('/customer/login', async (req, res) => {
  try {
    const { user_name, password } = req.body;  // Lấy id từ URL
    const customer = await Customer.findOne({ user_name: user_name, password: password }).select('-password');  // Tìm customer có user_name bằng với id

    if (customer) {
      res.json(customer);  // Nếu tìm thấy, trả về dữ liệu customer
    } else {
      res.status(404).send('username or password is incorrect!');  // Nếu không tìm thấy, trả về 404
    }
  } catch (error) {
    res.status(500).send(error);  // Xử lý lỗi
  }
});

// xử lí đăng kí tài khoản mới
app.post('/register', async (req, res) => {
  const { avatar, user_name, password, phone_number, location, gender } = req.body;

  try {
    // Kiểm tra tên người dùng đã tồn tại
    const existingUser = await Customer.findOne({ user_name });
    if (existingUser) {
      return res.status(400).json({ message: 'Tên người dùng đã tồn tại!' });
    }

    // Nếu chưa tồn tại, tạo tài khoản mới
    const newUser = new Customer({ avatar, user_name, password, phone_number, location, gender });
    await newUser.save();

    res.status(201).json({ message: 'Đăng ký thành công!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Đã xảy ra lỗi, vui lòng thử lại!' });
  }
});

// Thêm dữ liệu vào MongoDB
app.post('/Beach', async (req, res) => {
  try {
    const beach = new Beach(req.body);
    const result = await beach.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(500).send(error);
  }
});
app.post('/Restaurant', async (req, res) => {
  try {
    const restaurant = new Restaurant(req.body);
    const result = await restaurant.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(500).send(error);
  }
});
app.post('/Hotel', async (req, res) => {
  try {
    const hotel = new Hotel(req.body);
    const result = await hotel.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(500).send(error);
  }
});
app.post('/CoffeeShop', async (req, res) => {
  try {
    const coffeeshop = new CoffeeShop(req.body);
    const result = await coffeeshop.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(500).send(error);
  }
});
app.post('/Customer', async (req, res) => {
  try {
    const customer = new Customer(req.body);
    const result = await customer.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

// xử lí khi user like tourlist
app.put('/tourlist/like/:_id_tourlist', async (req, res) => {
  try {
    const tourlist_id = req.params._id_tourlist;
    const user_like = req.body

    const one_tourlist = await Tourlist.findById(tourlist_id)

    if (!one_tourlist) {
      return res.status(404).send({ message: 'Tourlist not found' });
    }

    // Kiểm tra nếu người dùng đã like
    const itemIndex = one_tourlist.like_user.findIndex(item => item.user_name === user_like.user_name);

    if (itemIndex === -1) {
      // Nếu user không tồn tại trong mảng like_user, thêm user vàos
      one_tourlist.like_user.push(user_like);
    } else {
      // Nếu user đã tồn tại trong mảng like_user, xóa user khỏi mảng
      one_tourlist.like_user.splice(itemIndex, 1);
    }

    // Cập nhật tài liệu
    const updatedTourlist = await one_tourlist.save(); // Lưu các thay đổi

    const allTourList = await Tourlist.find();

    res.status(200).json(allTourList);
  } catch (error) {
    console.error('Error occurred:', error); // Log lỗi chi tiết
    res.status(500).send({ message: 'Internal server error', error: error.message });
  }
});

// Update dữ liệu 
app.put('/api/Restaurant/:id', async (req, res) => {
  try {
    const restaurantId = req.params.id;

    // Tìm và cập nhật tài liệu dựa trên ID
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(restaurantId, req.body, {
      new: true,        // Trả về tài liệu đã được cập nhật
      runValidators: true // Chạy các validate trên dữ liệu mới
    });

    if (!updatedRestaurant) {
      return res.status(404).send({ message: 'Restaurant not found' });
    }

    res.status(200).json(updatedRestaurant);
  } catch (error) {
    res.status(500).send(error);
  }
});

// update thông tin user
app.put('/customer/:user_name', async (req, res) => {
  const userName = req.params.user_name; // Lấy user_name từ URL
  const updatedData = req.body; // Dữ liệu mới để cập nhật

  try {
    // Tìm và cập nhật thông tin khách hàng
    const result = await Customer.findOneAndUpdate(
      { user_name: userName },
      updatedData,
      { new: true } // Trả về document đã được cập nhật
    );

    if (!result) {
      return res.status(404).json({ message: 'Khách hàng không tìm thấy' });
    }

    res.status(200).json(result); // Trả về kết quả cập nhật
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Có lỗi xảy ra' });
  }
});

app.put('/api/Hotel/:id', async (req, res) => {
  try {
    const hotelId = req.params.id;

    // Tìm và cập nhật tài liệu dựa trên ID
    const updatedHotel = await Hotel.findByIdAndUpdate(hotelId, req.body, {
      new: true,        // Trả về tài liệu đã được cập nhật
      runValidators: true // Chạy các validate trên dữ liệu mới
    });

    if (!updatedHotel) {
      return res.status(404).send({ message: 'Restaurant not found' });
    }

    res.status(200).json(updatedHotel);
  } catch (error) {
    res.status(500).send(error);
  }
});
app.put('/api/CoffeeShop/:id', async (req, res) => {
  try {
    const coffeeShopId = req.params.id;

    // Tìm và cập nhật tài liệu dựa trên ID
    const updatedCoffeeShop = await CoffeeShop.findByIdAndUpdate(coffeeShopId, req.body, {
      new: true,        // Trả về tài liệu đã được cập nhật
      runValidators: true // Chạy các validate trên dữ liệu mới
    });

    if (!updatedCoffeeShop) {
      return res.status(404).send({ message: 'Restaurant not found' });
    }

    res.status(200).json(updatedCoffeeShop);
  } catch (error) {
    res.status(500).send(error);
  }
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
