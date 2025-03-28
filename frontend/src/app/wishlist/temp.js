/* eslint-disable react/jsx-no-undef */
{sections.map((section) => (
    <div key={section.id} className="cursor-pointer p-4 border rounded-lg shadow-md hover:bg-gray-100">

      {/* Display the section name */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        {section.name} 
      </h2>
      
      {/*Delete button */}
      <button
        onClick={() => removeSection(section.id)}
        className="mb-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
      >X
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {section.items.map((item) => (
          <WishlistCard
            key={item.id}
            item={item}
            onRemove={() => removeItem(section.id, item.id)} // ✅ Use removeItem function here
            onEdit={(updatedItem) => editItem(section.id, updatedItem)} // ✅ Pass edit function
          />
        ))}
      </div>
    </div>
  ))}