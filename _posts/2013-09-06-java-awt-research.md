---
layout: post
title: Java AWT研究
tagline: ""
tags : [java]
---
{% include JB/setup %}

AWT(Abstract Window Toolkit)即抽象视窗工具组, 是Java基础类(JFC)的一部分,
为Java程序提供GUI的标准API. 

Java释出的时候, AWT作为Java最弱的组件受到不小的批评.
最根本的缺点是AWT在原生的用户界面之上仅提供了一个非常薄的抽象层.
例如, 生成一个AWT的复选框会导致AWT直接调用下层原生例程来生成一个复选框. 不幸的是,
一个Windows平台上的复选框同MacOS平台或者各种UNIX风格平台上的复选框并不是那么相同.

<!-- more -->

在第二版的Java开发包中, AWT的器件很大程度上被Swing工具包替代.
Swing通过自己绘制器件而避免了AWT的种种弊端: Swing调用本地图形子系统中的底层例程,
而不是依赖操作系统的高层用户界面模块.

## 1. 类图

![UML](https://wh7ghw.bay.livefilestore.com/y2pPSCgLModlGpMDx2Aco276U2ll-l5X58SN2tzE_aitHlumv5AqaA2-fLT2y7eYKM0iv8hdLWFYNLzsxlhF4fsWjKkTJFfJKIsMfvFHO-M0lA/awt-uml.png 'UML')

![UML](https://wh7ghw.bay.livefilestore.com/y2pfrs_tpU3hsw7bQv_HE-RVg5EQ9i9ygH7gAvztpM_meUFJ1pmEL8FrUgZufDz6M33B3OFqlmtAD-XHBco8miD-E8LBgF1_v9Jn65X6_uPj54/awt-uml2.png 'UML')

## 2. 容器 (Container)

两个主要容器类型是Window和Panel.

### (1) Window

Window是显示屏上的独立本机窗口, 它独立于其他容器.
Winodw有两种形式: Frame, Dialog. 它们是Winodw的子类.

#### Frame:

具有标题和缩放角.
刚创建出来的Frame对象是不可见的. 当它还处于不可见状态时, 将所有组件添加到框架中.
调用setVisible(true)方法将Frame对象变为可见的.
它的默认布局管理器是BorderLayout.

#### Dialog:
    
没有菜单条, 它能移动, 但不能缩放.

### (2) Panel

Panel包含在另一个容器中, 或是在Web浏览器的窗口中.
Panel确定一个四边形, 其他组件可以放入其中.
Panel必须放在Window或Window的子类之中, 以便能显示出来.
为组件提供空间, 允许子面板有自己的布局管理器.
它的默认布局管理器是FlowLayout.

## 3. 定位组件

容器里组件的位置和大小是由布局管理器决定的.
容器对布局管理器的特定实例保持一个引用.
当容器需要定位一个组件时, 或决定一个组件的大小时, 它将调用布局管理器来做.
布局管理器完全控制容器内的所有组件, 它负责计算并定义上下文中对象在实际屏幕中所需的大小.

但是我们可以通过`setLayout(null)`来取消容器的布局管理器,
然后通过`setLocation()`, `setSize()`, `setBounds()` 控制组建的位置和大小.
不过建议用布局管理器, 而不是自己设定位置.

## 4. 布局管理器

在AWT中, 提供了五种布局管理器:

### (1) BorderLayout

BorderLayout为在一个Panel或Window中放置组件提供一个更复杂的方案.

Border布局管理器包括五个明显的区域:东南西北中.
北占据面板的上方, 东在右.中间区域是在东南西北都填满后剩下的区域.
没有指定方向的组件默认放在中间.
每个区域只能加入一个组件, 如加入多个, 则之前加入的组件会被遗弃.

当窗口垂直延伸时, 东西中区域也延伸; 而当窗口水平延伸时, 南北中区域也延伸.
当窗口缩放时, 按钮相应的位置不改变, 但其大小改变.

缩放原则:
南北两个区域只能在水平方向缩放(宽度可调整);
东西两个区域只能在垂直方向缩放(高度可调整);
中部可在两个方向上缩放.

实例:

{% highlight java %}
Frame frame = new Frame("Example");

bn = new Button("Button 1");
bs = new Button("Button 2");
be = new Button("Button 3");
bw = new Button("Button 4");
bc = new Button("Button 5");

frame.add(bn, BorderLayout.NORTH);
frame.add(bs, BorderLayout.SOUTH);
frame.add(be, BorderLayout.EAST);
frame.add(bw, BorderLayout.WEST);
frame.add(bc, BorderLayout.CENTER);

frame.setSize(400, 400);
frame.setVisible(true);
{% endhighlight %}

### (2) FlowLayout

与其他布局管理器不一样, Flow布局管理器不限制它所管理的组件的大小, 而是允许它们有自己的最佳大小.
默认是居中放置组件.
如果想在组件之间创建一个更大的最小间隔, 可以规定一个界限.
当用户对由Flow布局管理的区域进行缩放时, 布局就发生变化.
FlowLayout的构造方法:

{% highlight java %}
// 使用缺省的居中对齐方式, 水平和垂直间距为缺省值5.
new FlowLayout();

// 右对齐, 组件之间水平间距20个像素, 竖直间距40个像素.
new FlowLayout(FlowLayout.RIGHT, 20, 40);

// 左对齐, 水平和竖直间距为缺省值: 5像素.
new FlowLayout(FlowLayout.LEFT);
{% endhighlight %}

实例:

{% highlight java %}
Frame frame = new Frame("Flow Layout");
    
//使用FlowLayout替换掉默认的BorderLayout
frame.setLayout(new FlowLayout());

button1 = new Button("Hello");
button2 = new Button("World");
button3 = new Button("Welcome");

frame.add(button1);
frame.add(button2);
frame.add(button3);

frame.setSize(100, 100);
frame.setVisible(true);
{% endhighlight %}

### (3) GridLayout
### (4) CardLayout
### (5) GridBagLayout

## 5. 事件机制

AWT使用观察者模式来处理来自GUI组件的事件, 例如, 按钮点击和鼠标运动.
组件通过方法支持添加各种类型的事件监听器.例如,
{% highlight java %}
void addActionListener(ActionListener al)
void addMouseMotionListener(MouseMotionListener mml)
{% endhighlight %}
可以添加多个事件监听器,当关联的事件发生时它们都会被调用.但是,无法保证监听器的顺序.

事件机制种, 有三个概念要搞清楚: 事件源, 事件监听器, 事件.

### (1) 事件类

与AWT有关的所有事件类都由java.awt.AWTEvent类派生, 它也是EventObject类的子类.
AWT事件共有10类, 可以归为两大类: 低级事件和高级事件. 

低级事件是指基于组件和容器的事件, 当一个组件上发生事件, 如: 鼠标的进入, 点击,拖放等,或组件的窗口开关等,触发了组件事件.
高级事件是基于语义的事件, 它可以不和特定的动作相关联, 而依赖于触发此事件的类,
如在TextField中按Enter键会触发ActionEvent事件,
滑动滚动条会触发AdjustmentEvent事件, 或是选中项目列表的某一条就会触发ItemEvent事件.

+ 低级事件

ComponentEvent(组件事件: 组件尺寸的变化, 移动)

ContainerEvent(容器事件: 组件增加, 移动)

WindowEvent(窗口事件: 关闭窗口, 窗口闭合, 图标化)

FocusEvent(焦点事件: 焦点的获得和丢失)

KeyEvent(键盘事件: 键按下、释放)

MouseEvent(鼠标事件: 鼠标单击, 移动)

+ 高级事件

ActionEvent(动作事件: 按钮按下, TextField中按Enter键)

AdjustmentEvent(调节事件: 在滚动条上移动滑块以调节数值)

ItemEvent(项目事件: 选择项目, 不选择"项目改变")

TextEvent(文本事件, 文本对象改变)

### (2) 事件监听器

每类事件都有对应的事件监听器, 监听器是接口, 根据动作来定义方法.

例如, 与键盘事件KeyEvent相对应的接口是:

{% highlight java %}
public interface KeyListener extends EventListener
{
    public void keyPressed(KeyEvent ev);
    public void keyReleased(KeyEvent ev);
    public void keyTyped(KeyEvent ev);
}
{% endhighlight %}


#### 事件适配器:

Java语言为一些Listener接口提供了适配器(Adapter)类. 
可以通过继承事件所对应的Adapter类, 重写需要方法, 无关方法不用重写.
事件适配器为我们提供了一种简单的实现监听器的手段, 可以缩短程序代码.
但是, 由于Java的单一继承机制, 当需要多种监听器或此类已有父类时, 就无法采用事件适配器了.









