class ScriptBehavior extends Sup.Behavior {

  buttons: Sup.Actor[];
  buttonIndex : number = 0 ;
  Ray = new Sup.Math.Ray2D();
  
  
  Start()
  {
    this.buttons = Sup.getActor("Buttons").getChildren();
    this.updateFocusedButton();
  }
  
    
  update()
  {
    this.keyNavigation();
    this.mouseNavigation();
  }
  
  keyNavigation()
  {
    if (Sup.Input.wasKeyJustPressed)
    
    
  }
  
}