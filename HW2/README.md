# HW2

## PATTERNS

### CREATIONAL PATTERNS

Creational Patterns are design patterns that primarily concerns with object creation mechanisms. The goal of creational patterns is to isolate a system from how its objects are created, composed and represented.

#### Singleton
It is a design pattern that restricts the instantiation of a class to one object. Singleton patterns are useful when there is a requirement for exactly one object to co-ordinate actions across the system.
Implementation
. ensure that only one instance of the singleton class exists
. provide global access to that instance
An example is as shown below

public final class SingletonClass {

    private static final SingletonClass new_instance = new SingletonClass();
    
    private SingletonClass() {}

    public static SingletonClass getInstance() {
    
        return new_instance;
        
    }
    
}

As it can be seen, the constructor SingletonClass is a private member
getInstance() class returns a method that returns a reference to the instance.

#### Prototype
It is used when the types of objects to create is decided by prototypical instance, which is cloned to produce new objects. The 'new' operator is considered harmful for this design pattern. 
Implementation
Avoid subclasses of an object creator
Avoid the cost of creating a new object in the standard way as it is significantly more expensive than cloning
An example is shown below

public abstract class PrototypePattern implements Cloneable{

	public PrototypePattern clone() throws CloneNotSupportedException{
	
	return (PrototypePattern) super.clone();
	
	}
	
}

public class CloningPrototype extends PrototypePattern {

	@Override
	
	public PrototypePattern clone() throws CloneNotSupportedException{
	
		return super.clone();
		
	}
	
}

As it can be seen, the usage of the new operator is avoided and the clone function is used instead.

### STRUCTURAL PATTERNS

Structural Patterns describe how objects and classes can be composed to form larger structures. The pattern focuses on how classes inherit from each other and how they combine to form other classes.

#### Bridge
The main objective of the bridge is to separate the abstraction from the implementation so the two can vary independently. When a class varies often, OOP features become extremely useful because the changes made to the program's code can be made with very little knowledge about the program. The bridge pattern is used in the following instances :-
1. An implementation is shared among multiple objects.
2. Mapping of orthogonal class hierarchies

The bridge pattern is very useful when you would otherwise have to deal with the Cartesian Product of implementations. Consider for example,
If half the code is OS-dependent and half the code is CPU-dependent, then you have (#OSes)*(#CPUs) implementations to write. However, if you use a bridge, you have (#OSes)+(#CPUs) to write that is assuming you can use a bridge in this scenario

#### Composite
The Composite Pattern describes that a group of objects is to be treated as a single instance of an object. The primary motivation behind Composite patterns is that programmers often find it difficult to differentiate between a leaf node and an inner node resulting in more complex and error-prone scripts. In OOP, a composite is an object designed as a composition of one-or-more similar objects where all exhibit similar functionality.
Composite should be used when multiple objects are being used the same way (which results in a similar repetitive code). It reduces the complexity and improves code reusability as composites are homogeneous.
For example consider shapes. Shapes are an abstraction for Lines, Rectangles and other Complex Shapes. In this case, the lines and rectangles are leaf nodes whereas the ComplexShapes is a composite which implements services described by the Shape Interface.

### BEHAVIORAL PATTERN

Behavioral patterns are concerned with the strategy of object collaboration and the delegation of responsibilities among objects. The pattern characterizes object communication and simplifies the dynamic control flow of object behavior

#### Iterator
In OOP, the iterator pattern is a design pattern provides a way to access the individual elements of a sequentially without exposing the underlying representation. It decouples algorithms from containers. The Iterator pattern allows us to
1. Access contents of a collection without exposing its own internal structure.
2. Support many concurrent traversals of a collection.
3. Provide a consistent interface for traversing different collections.
For example, consider a collection of books and using an iterator to iterate through the collection and access each individual book

#### Interpreter
The interpreter pattern is a design pattern that indicates how to evaluate sentences in a language. The interpreter pattern is used extensively in defining grammars to tokenize input and store it. It is used when the class of problems occurs frequently in a well-defined and well-documented domain. The interpreter recommends modelling the domain with a recursive grammar. Every rule is either a composite or a leaf node. It relies on the recursive traversal of the composite pattern to interpret the lines its asked to parse.
For example, interpreting Roman Numerals. The string that has to be interpreted is put in context which contains the unparsed Roman numerals and the result of the numerals that have been parsed. 
The interpreter pattern has a very limited area where it can be applied. The pattern can be applied for parsing with light expressions defined in simple grammars.

### FREE STYLE

One big criticism of design patterns is about how generic many design patterns really are. In a lot of cases, the problem is over architecting the applications and applying all the patterns wherever possible. The design patterns are also highly language specific and problem specific.

#### Model-View-Controller
The MVC divides a given software into three interconnected parts, the Model, View and Controller respectively. The main purpose of doing so is to separate the internal representation of data from the ways the data is presented to the user.
The main components of the MVC is as follows :-
- Model - Manages the data. It's usually a representation of the database. It represents knowledge
- View - Output of the representation which is usually what the user sees on screen.
- Controller - Communicates between the Model and View. Accepts the inputs and converts it into commands for the view or the model.
The main advantages of MVC is the increase in the code reusability and less coupling between the layers.
The main disadvantage however is its complexity to implement and it's not suitable for small applications.

#### Pipeline and Filter Architecture
This pattern is used in algorithms where data flows through a sequence of tasks or several stages. The output of each stage is the input for the next stage. The pipeline pattern is used when the problem consists of performing a sequence of calculations, each of which can be split into distinct stages on a sequence of inputs. It is particularly useful when the number of calculations is large when compared to the number of stages and when it is possible to dedicate a processor to each element, or the very least, each stage of the pipeline. Laravel uses the Pipeline Design pattern in a couple of places throughout the framework.
The main advantages of Pipeline is that complex processes can be broken down into individual tasks which improves task isolation. Moreover, it is simple to add, remove or replace tasks into a complex process without disturbing the existing process.
The main disadvantages of this pattern is the fact that there is an unnecessary complexity added when the individual parts are combined as a whole. Additionally, the process is unreliable if it does not work as a whole.

#### Multitier Architecture
A multi-tier application is any application where the development is spread among more than one layer. The presentation, application processing and data management functions are physically separated. The most ubiquitous use of the multitier architecture is the 3-tier architecture. With the use of an N-tier architecture, developers can create flexible application with a high quotient of reusability.
The main advantages of a multi-tier architecture is the fact that the layers increase the testability of an application. Additionally, the maintenance of the application is easier because of the low coupling between the layers.
The main disadvantages is that it creates an increased need for network traffic management, server load balancing and fault tolerance. Moreover, it is time consuming to build even a small part of the application.

### GraphQL based API vs. RESTful API

GraphQL aims at improving the way clients communicate with remote systems. The underlying concept of GraphQL is that instead of defining the structure of responses on the server, the flexibility is at the client's end. Every request specifies what fields and relationships it wants to get back and GraphQL will construct a tailor-made response for this particular request. The benefit of doing this is that one round trip is enough to fetch complex data which could otherwise span several REST points.

#### Differences between GraphQL and REST
1. In GraphQL, instead of the server dictating what the response will look like, the query itself defines the style of the response
2. GraphQL is much more scalable than RESTful APIs
3. GraphQL has built in type type introspection which means that the entire API can be described programmatically

#### Advantages of GraphQL
1. Hierarchical - GraphQL naturally follows the relationship between objects.
2. Strongly Typed - Each level of corresponds to a particular type and each type describes a set of available fields
3. Version Free - The shape of the returned data is determined entirely by the client's query

#### Disadvantages of GraphQL
1. No way to achieve real-time updates.

#### Advantages of RESTful APIs
1. Makes it easy for new clients to use the application.
2. Makes the app more flexible as the separation the front and back end are on different servers.
3. REST API is independent of the type of platform or languages

#### Disadvantages of RESTful APIs
1. REST API rarely allows clients to dictate the fields they get
2. Client is sending all messages with redundant information. Adds bandwidth and latency
3. Not designed for persistent connections

I feel the experience of the developer is definitely improved as GraphQL's endpoints will stand atop existing endpoints of the REST API. However, since RESTful APIs have been extensively used over the past few years, the documentation is thorough which is not the case with respect to a GraphQL. As a result, I think the industry will slowly move towards GraphQL but as of now RESTful APIs will still be in use extensively.

### POKEMON GO ARCHITECTURE

![Alt text](Architecture_Diagram.jpg?raw=true "Architecture Diagram")

Figure - Architecture Diagram of Pokemon Go

The backend database basically contains all the data regarding the pokemon, gyms and their respective locations. The user has his own profile and is part of a team and has database containing all the pokemon he has caught. The user sends location related data to a middleware controller which basically queries the database and gathers data with respect to the pokemon and the gyms in the surrounding area. In addition to this, the middleware also sends the map-related data to the user based on the location. At the client side, the user encounters a pokemon if there is a location match. If the user decides to catch the pokemon, then based on the probability of it getting caught, data regarding the pokemon should be stored in the user's database. The Game Engine is responsible for the basic Game related UI such as movement, steering, collisions and rendering of the different elements on the screen.

One constraint I noticed is the fact that all data is stored in one database. So this could result in the response time being longer than expected. A simple solution to this would be to split the data so as to avoid a complete shutdown if there is a technical issue with the one database.

I would select The MVC design architecture because it is scalable and well documented. Decoupling the client and the server would improve overall application performance and one of the ways to do this is the MVC architecture.
