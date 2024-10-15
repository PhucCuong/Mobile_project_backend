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
       description:String,
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
      image:String,
      description:String,
      phone:String,    
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
  image:String,
  description:String,
  phone:String,
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
  image:String,  
  description:String,
  phone:String,
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
  avatar:String,
  username: String,
  password: String
  
});

// Tạo model từ schema
const Restaurant = mongoose.model('Restaurant', restaurantSchema);
const Hotel = mongoose.model('Hotel', hotelSchema);
const CoffeeShop = mongoose.model('CoffeeShop', coffeeShopSchema);
const Customer = mongoose.model('Customer', customerSchema);
const Beach = mongoose.model('Beach', beachSchema)

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

app.get('/Customer', async (req, res) => {
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
