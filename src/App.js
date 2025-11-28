import React, { useState, useMemo } from "react";
import {
  ShoppingCart,
  User,
  LogIn,
  Store,
  X,
  Minus,
  Plus,
  ShoppingBag,
} from "lucide-react";

// --- MOCK DATA ---
const MOCK_PRODUCTS = [
  {
    id: 1,
    name: "Aurora Gaming PC",
    price: 1899.99,
    description: "Intel i9, RTX 4080, 32GB DDR5.",
    image: "https://placehold.co/400x300/1e293b/cbd5e1?text=GAMER+PC",
  },
  {
    id: 2,
    name: "Sentinel Laptop",
    price: 1299.0,
    description: "Slim 14-inch, Ryzen 7, 16GB RAM.",
    image: "https://placehold.co/400x300/374151/f3f4f6?text=LAPTOP",
  },
  {
    id: 3,
    name: "Vibe Wireless Headphones",
    price: 199.5,
    description: "Noise-cancelling, 40hr battery.",
    image: "https://placehold.co/400x300/4b5563/d1d5db?text=HEADPHONES",
  },
  {
    id: 4,
    name: 'Ergo Desk Monitor (34")',
    price: 650.75,
    description: "Ultrawide QHD, 144Hz refresh rate.",
    image: "https://placehold.co/400x300/6b7280/9ca3af?text=MONITOR",
  },
];

// --- AUTH VIEW COMPONENT ---
const AuthView = ({ navigate, setIsLoggedIn }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("error"); // "error" or "success"

  // Define the required hardcoded credentials for static login
  const REQUIRED_EMAIL = "ahmadalarab@gmail.com";
  const REQUIRED_PASSWORD = "1234";

  const handleAuth = (e) => {
    e.preventDefault();
    setMessage("");

    // Static Validation: Must have non-empty email and password
    if (email.trim() === "" || password.trim() === "") {
      setMessageType("error");
      setMessage("Email and Password cannot be empty.");
      return;
    }

    if (isLogin) {
      // --- LOG IN LOGIC: CHECK AGAINST HARDCODED VALUES ---
      if (email === REQUIRED_EMAIL && password === REQUIRED_PASSWORD) {
        // Successful Login
        setIsLoggedIn(true);
        navigate("products");
      } else {
        // Failed Login
        setMessageType("error");
        setMessage("Invalid email or password. Please try again.");
      }
    } else {
      // --- SIGN UP LOGIC (Unchanged, proceeds to login form) ---
      // 1. Clear fields
      setEmail("");
      setPassword("");

      // 2. Set success message and switch to login view
      setMessageType("success");
      setMessage(
        "Account created successfully! Please log in with your new credentials."
      );
      // 3. Navigate user to the login form
      setIsLogin(true);
      // 4. DO NOT set setIsLoggedIn(true) or navigate("products")
    }
  };

  const currentMessageStyle =
    messageType === "success"
      ? "p-3 mb-4 text-sm text-green-700 bg-green-100 rounded-lg"
      : "p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg";

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-6rem)] bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl border border-gray-100">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h2>

        {message && (
          <div className={currentMessageStyle} role="alert">
            {message}
          </div>
        )}

        <form onSubmit={handleAuth} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete={isLogin ? "current-password" : "new-password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
          >
            {isLogin ? "Sign in" : "Sign up"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setMessage(""); // Clear message when switching form
              setMessageType("error");
              setEmail(""); // Clear fields when switching form
              setPassword("");
            }}
            className="font-medium text-indigo-600 hover:text-indigo-500 ml-1 focus:outline-none"
          >
            {isLogin ? "Sign up" : "Log in"}
          </button>
        </p>
      </div>
    </div>
  );
};

// --- PRODUCT VIEW COMPONENT ---
const ProductView = ({ cart, setCart, navigate }) => {
  const handleAddToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  return (
    <div className="p-4 sm:p-8 bg-gray-50 min-h-[calc(100vh-6rem)]">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-8 text-center sm:text-left flex items-center justify-between">
        Featured Electronics
        <button
          onClick={() => navigate("cart")}
          className="sm:hidden text-indigo-600 hover:text-indigo-700 focus:outline-none"
        >
          <ShoppingCart className="w-6 h-6" />
        </button>
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {MOCK_PRODUCTS.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-xl overflow-hidden transform hover:scale-[1.02] transition duration-300 border border-gray-200"
          >
            {/* Image Placeholder */}
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover object-center"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://placehold.co/400x300/cccccc/333333?text=Image+Missing";
              }}
            />

            <div className="p-5 flex flex-col justify-between h-[calc(100%-12rem)]">
              <div>
                <h3 className="text-xl font-bold text-gray-900 truncate">
                  {product.name}
                </h3>
                <p className="mt-1 text-sm text-gray-500 h-10 overflow-hidden">
                  {product.description}
                </p>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-2xl font-extrabold text-indigo-600">
                  ${product.price.toFixed(2)}
                </span>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out flex items-center"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- CART VIEW COMPONENT ---
const CartView = ({ cart, setCart, navigate }) => {
  // Simple state for checkout process visualization
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutMessage, setCheckoutMessage] = useState("");

  // Calculate totals using useMemo for performance
  const { subtotal, tax, total } = useMemo(() => {
    const sub = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const taxRate = 0.08;
    const t = sub * taxRate;
    return {
      subtotal: sub,
      tax: t,
      total: sub + t,
    };
  }, [cart]);

  /**
   * Updates the quantity of a cart item, ensuring the quantity never drops below 1.
   * @param {number} id - The ID of the product.
   * @param {number} change - The amount to change the quantity by (e.g., -1 or 1).
   */
  const updateQuantity = (id, change) => {
    setCart(
      cart.map((item) => {
        if (item.id === id) {
          // Calculate the new quantity
          const newQuantity = item.quantity + change;

          // Ensure quantity is never less than 1
          const safeQuantity = Math.max(1, newQuantity);

          return { ...item, quantity: safeQuantity };
        }
        return item;
      })
    );
  };

  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      setCheckoutMessage(
        "Your cart is empty. Please add products before checking out."
      );
      return;
    }
    // Static checkout simulation
    setIsCheckingOut(true);
    setCheckoutMessage(
      "Processing payment... (This is a static template simulation)"
    );

    // Simulate completion and clear cart
    setTimeout(() => {
      setCheckoutMessage(
        "Order successfully placed! Thank you for your purchase."
      );
      setCart([]);
      setIsCheckingOut(false);

      // Navigate to products after a successful mock order
      setTimeout(() => navigate("products"), 2000);
    }, 3000);
  };

  // Cart Item Card component
  const CartItem = ({ item }) => (
    <div className="flex items-center p-4 bg-white rounded-lg shadow-md mb-4 border border-gray-100">
      <img
        src={item.image}
        alt={item.name}
        className="w-16 h-16 object-cover object-center rounded-lg mr-4 hidden sm:block"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://placehold.co/64x64/cccccc/333333?text=I";
        }}
      />

      <div className="flex-grow">
        <h3 className="font-semibold text-gray-900">{item.name}</h3>
        <p className="text-sm text-gray-600">${item.price.toFixed(2)}</p>
      </div>

      <div className="flex items-center space-x-2 mr-4">
        <button
          onClick={() => updateQuantity(item.id, -1)}
          // Disable the button when quantity is 1 and style it differently
          className={`p-1 border rounded-full transition ${
            item.quantity <= 1
              ? "border-gray-200 text-gray-400 cursor-not-allowed"
              : "border-gray-300 hover:bg-gray-100"
          }`}
          disabled={isCheckingOut || item.quantity <= 1}
        >
          <Minus className="w-4 h-4" />
        </button>
        <span className="font-medium text-gray-800 w-6 text-center">
          {item.quantity}
        </span>
        <button
          onClick={() => updateQuantity(item.id, 1)}
          className="p-1 border border-gray-300 rounded-full hover:bg-gray-100 transition"
          disabled={isCheckingOut}
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <div className="font-bold text-gray-900 w-20 text-right hidden sm:block">
        ${(item.price * item.quantity).toFixed(2)}
      </div>

      <button
        onClick={() => removeItem(item.id)}
        className="ml-4 p-1 text-red-500 hover:text-red-700 transition"
        disabled={isCheckingOut}
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );

  return (
    <div className="p-4 sm:p-8 bg-gray-50 min-h-[calc(100vh-6rem)]">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-8">
        Shopping Cart
      </h1>

      {checkoutMessage && (
        <div
          className={`p-4 mb-4 text-center text-lg rounded-lg shadow-md ${
            checkoutMessage.includes("Order successfully")
              ? "bg-green-100 text-green-700"
              : "bg-blue-100 text-blue-700"
          }`}
          role="alert"
        >
          {checkoutMessage}
        </div>
      )}

      {cart.length === 0 && !checkoutMessage.includes("Order successfully") ? (
        <div className="text-center py-20 bg-white rounded-xl shadow-lg">
          <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-xl text-gray-600">Your cart is empty.</p>
          <button
            onClick={() => navigate("products")}
            className="mt-4 text-indigo-600 hover:text-indigo-700 font-semibold"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Cart Items List */}
          <div className="lg:col-span-2">
            {cart.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1 mt-8 lg:mt-0 sticky top-4 bg-white p-6 rounded-xl shadow-xl border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b pb-2">
              Order Summary
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({cart.length} items)</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between pt-4 border-t border-gray-200">
                <span className="text-xl font-extrabold text-gray-900">
                  Order Total
                </span>
                <span className="text-xl font-extrabold text-indigo-600">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={cart.length === 0 || isCheckingOut}
              className={`w-full mt-6 py-3 px-6 text-lg font-bold rounded-lg shadow-lg transition duration-300 ease-in-out flex items-center justify-center 
                ${
                  cart.length === 0 || isCheckingOut
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 text-white hover:bg-green-700 focus:ring-4 focus:ring-green-500/50"
                }
              `}
            >
              {isCheckingOut ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </>
              ) : (
                "Proceed to Checkout"
              )}
            </button>
            <button
              onClick={() => navigate("products")}
              className="w-full mt-3 py-2 text-indigo-600 hover:text-indigo-700 font-semibold text-center rounded-lg"
              disabled={isCheckingOut}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// --- MAIN APPLICATION COMPONENT ---
export default function App() {
  const [page, setPage] = useState("products"); // Default to products page
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cart, setCart] = useState([]); // State for cart items [{id, name, price, quantity}]

  const navigate = (newPage) => {
    setPage(newPage);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("auth");
  };

  // Header component - remains constant across all views
  const Header = () => {
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
      <header className="sticky top-0 z-10 bg-white shadow-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
          {/* Logo/Store Name */}
          <button
            onClick={() => navigate("products")}
            className="flex items-center space-x-2 text-2xl font-extrabold text-indigo-600 hover:text-indigo-700 transition duration-150 ease-in-out"
          >
            <Store className="w-7 h-7" />
            <span>011-computers</span>
          </button>

          {/* Navigation and Actions */}
          <nav className="flex items-center space-x-4 sm:space-x-6">
            <button
              onClick={() => navigate("products")}
              className={`text-base font-medium ${
                page === "products"
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : "text-gray-500 hover:text-gray-900"
              } hidden sm:inline-flex py-1 transition duration-150`}
            >
              Products
            </button>

            {/* Cart Button */}
            <button
              onClick={() => navigate("cart")}
              className="p-2 relative rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition duration-150 ease-in-out"
            >
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform bg-red-600 rounded-full">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Auth/User Button */}
            {isLoggedIn ? (
              <div className="flex items-center space-x-2">
                <div className="p-2 rounded-full bg-indigo-500 text-white hidden sm:flex items-center justify-center">
                  <User className="w-5 h-5" />
                </div>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1.5 text-sm font-semibold rounded-lg text-white bg-red-500 hover:bg-red-600 transition"
                  title="Logout"
                >
                  <LogIn className="w-5 h-5 inline-block sm:hidden" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => navigate("auth")}
                className={`px-3 py-1.5 text-sm font-semibold rounded-lg ${
                  page === "auth"
                    ? "bg-indigo-700 text-white"
                    : "bg-indigo-500 text-white hover:bg-indigo-600"
                } transition`}
              >
                Sign In
              </button>
            )}
          </nav>
        </div>
      </header>
    );
  };

  // Main rendering logic based on current page
  const renderView = () => {
    // If not logged in, force the user to the auth page.
    if (!isLoggedIn && page !== "auth") {
      setPage("auth");
    }

    switch (page) {
      case "auth":
        return <AuthView navigate={navigate} setIsLoggedIn={setIsLoggedIn} />;
      case "cart":
        return <CartView cart={cart} setCart={setCart} navigate={navigate} />;
      case "products":
      default:
        // Even if the user is forced back to auth above, this is the default view if logged in
        return (
          <ProductView cart={cart} setCart={setCart} navigate={navigate} />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans antialiased">
      <Header />
      <main>{renderView()}</main>
    </div>
  );
}
