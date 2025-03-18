"use client";
import React, { useState, useRef } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Modal, Button, Form, Badge, Dropdown, Toast } from 'react-bootstrap';

// Icons
import { 
  PlusCircle, 
  Trash, 
  Mail, 
  Phone, 
  MessageSquare, 
  Bell, 
  FileText, 
  Calendar, 
  Copy, 
  Edit, 
  Clock,
  Users
} from 'lucide-react';

// Define item types for drag and drop
const ItemTypes = {
  STEP: 'step',
  NEW_STEP: 'newStep'
};

const JourneyBuilder = ({ campaignGoal, selectedSegments }) => {
  // State declarations
  const [journeySteps, setJourneySteps] = useState([]);
  const [showStartOptions, setShowStartOptions] = useState(true);
  const [showContentEditor, setShowContentEditor] = useState(false);
  const [currentEditingStep, setCurrentEditingStep] = useState(null);
  const [currentEditingChannel, setCurrentEditingChannel] = useState(null);
  const [currentContent, setCurrentContent] = useState('');
  const [isGeneratingContent, setIsGeneratingContent] = useState(false);
  const [showSegmentEditor, setShowSegmentEditor] = useState(false);
  const [showCampaignConfig, setShowCampaignConfig] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // Available campaign elements
  const stepTypes = [
    { id: 'onboarding', name: 'Onboarding', icon: <Users size={18} /> },
    { id: 'education', name: 'Education', icon: <FileText size={18} /> },
    { id: 'reminder', name: 'Reminder', icon: <Bell size={18} /> },
    { id: 'followup', name: 'Follow-up', icon: <MessageSquare size={18} /> },
    { id: 'appointment', name: 'Appointment', icon: <Calendar size={18} /> },
    { id: 'survey', name: 'Survey', icon: <FileText size={18} /> }
  ];

  const channelTypes = [
    { id: 'email', name: 'Email', icon: <Mail size={18} /> },
    { id: 'sms', name: 'SMS', icon: <MessageSquare size={18} /> },
    { id: 'call', name: 'Phone Call', icon: <Phone size={18} /> },
    { id: 'push', name: 'Push Notification', icon: <Bell size={18} /> },
    { id: 'mail', name: 'Direct Mail', icon: <FileText size={18} /> }
  ];

  // Drag and drop functions
  const moveStep = (dragIndex, hoverIndex) => {
    const draggedStep = journeySteps[dragIndex];
    const newSteps = [...journeySteps];
    newSteps.splice(dragIndex, 1);
    newSteps.splice(hoverIndex, 0, draggedStep);
    setJourneySteps(newSteps);
  };
  
  // Add step at specific position
  const addStepAtPosition = (index) => {
    const newStep = {
      id: `step-${Date.now()}`,
      name: `Step ${journeySteps.length + 1}`,
      type: 'education',
      channels: [],
      segments: [...selectedSegments],
      delayDays: 0
    };
    
    const newSteps = [...journeySteps];
    newSteps.splice(index, 0, newStep);
    setJourneySteps(newSteps);
  };

  const handleStartFromScratch = () => {
    setShowStartOptions(false);
    // Start with a single step
    setJourneySteps([{
      id: `step-${Date.now()}`,
      name: 'Step 1',
      type: 'onboarding',
      channels: [],
      segments: [...selectedSegments],
      delayDays: 0
    }]);
  };

  const handleImportJourney = () => {
    // Placeholder for import functionality
    setShowStartOptions(false);
    alert('Import journey functionality would be implemented here');
  };

  const handleUseTemplate = () => {
    // Placeholder for template selection
    setShowStartOptions(false);
    alert('Template selection would be implemented here');
  };

  const addStep = () => {
    const newStep = {
      id: `step-${Date.now()}`,
      name: `Step ${journeySteps.length + 1}`,
      type: 'education',
      channels: [],
      segments: [...selectedSegments],
      delayDays: 0
    };
    
    setJourneySteps([...journeySteps, newStep]);
  };

  const removeStep = (stepId) => {
    setJourneySteps(journeySteps.filter(step => step.id !== stepId));
  };

  const addChannelToStep = (stepId, channelType) => {
    const updatedSteps = journeySteps.map(step => {
      if (step.id === stepId) {
        const newChannel = {
          id: `channel-${Date.now()}`,
          type: channelType,
          content: '',
          segments: [...step.segments]
        };
        return {
          ...step,
          channels: [...step.channels, newChannel]
        };
      }
      return step;
    });
    
    setJourneySteps(updatedSteps);
  };

  const removeChannelFromStep = (stepId, channelId) => {
    const updatedSteps = journeySteps.map(step => {
      if (step.id === stepId) {
        return {
          ...step,
          channels: step.channels.filter(channel => channel.id !== channelId)
        };
      }
      return step;
    });
    
    setJourneySteps(updatedSteps);
  };

  const openContentEditor = (stepId, channelId) => {
    const step = journeySteps.find(s => s.id === stepId);
    const channel = step.channels.find(c => c.id === channelId);
    
    setCurrentEditingStep(stepId);
    setCurrentEditingChannel(channelId);
    setCurrentContent(channel.content || '');
    setShowContentEditor(true);
  };

  const generateAIContent = () => {
    setIsGeneratingContent(true);
    
    // Simulate AI content generation
    setTimeout(() => {
      const step = journeySteps.find(s => s.id === currentEditingStep);
      const channel = step.channels.find(c => c.id === currentEditingChannel);
      
      let generatedContent = '';
      
      if (channel.type === 'email') {
        generatedContent = `Subject: Important information about your health plan\n\nDear Member,\n\nWelcome to your new health plan! We're excited to have you join our community of members committed to better health outcomes.\n\nHere are some next steps to get the most from your benefits:\n- Complete your health risk assessment\n- Choose a primary care provider\n- Download our mobile app\n\nIf you have any questions, please don't hesitate to contact us.\n\nBest regards,\nYour Health Plan Team`;
      } else if (channel.type === 'sms') {
        generatedContent = `Welcome to your new health plan! To complete your onboarding, please visit yourplan.health/onboarding or call us at (800) 555-1234.`;
      }
      
      setCurrentContent(generatedContent);
      setIsGeneratingContent(false);
    }, 1500);
  };

  const saveContent = () => {
    const updatedSteps = journeySteps.map(step => {
      if (step.id === currentEditingStep) {
        const updatedChannels = step.channels.map(channel => {
          if (channel.id === currentEditingChannel) {
            return {
              ...channel,
              content: currentContent
            };
          }
          return channel;
        });
        
        return {
          ...step,
          channels: updatedChannels
        };
      }
      return step;
    });
    
    setJourneySteps(updatedSteps);
    setShowContentEditor(false);
  };

  const openSegmentEditor = (stepId, channelId = null) => {
    setCurrentEditingStep(stepId);
    setCurrentEditingChannel(channelId);
    setShowSegmentEditor(true);
  };

  const updateSegments = (updatedSegments) => {
    const updatedSteps = journeySteps.map(step => {
      if (step.id === currentEditingStep) {
        if (currentEditingChannel) {
          // Update segments for a specific channel
          const updatedChannels = step.channels.map(channel => {
            if (channel.id === currentEditingChannel) {
              return {
                ...channel,
                segments: updatedSegments
              };
            }
            return channel;
          });
          
          return {
            ...step,
            channels: updatedChannels
          };
        } else {
          // Update segments for the entire step
          return {
            ...step,
            segments: updatedSegments
          };
        }
      }
      return step;
    });
    
    setJourneySteps(updatedSteps);
    setShowSegmentEditor(false);
  };

  const deployJourney = () => {
    setIsDeploying(true);
    
    // Simulate deployment process
    setTimeout(() => {
      setIsDeploying(false);
      setShowSuccessToast(true);
      
      // Hide toast after 3 seconds
      setTimeout(() => {
        setShowSuccessToast(false);
        // Use window location instead of router
        window.location.href = '/campaigns';
      }, 3000);
    }, 2000);
  };

  // Draggable Step Item Component
  const DraggableStepItem = ({ step, index, moveStep }) => {
    const ref = useRef(null);
    
    // Set up drag source
    const [{ isDragging }, drag] = useDrag({
      type: ItemTypes.STEP,
      item: { id: step.id, index },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });
    
    // Set up drop target
    const [{ isOver, canDrop }, drop] = useDrop({
      accept: ItemTypes.STEP,
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
      hover(item, monitor) {
        if (!ref.current) {
          return;
        }
        const dragIndex = item.index;
        const hoverIndex = index;
        
        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
          return;
        }
        
        // Determine rectangle on screen
        const hoverBoundingRect = ref.current.getBoundingClientRect();
        
        // Get vertical middle
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        
        // Determine mouse position
        const clientOffset = monitor.getClientOffset();
        
        // Get pixels to the top
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;
        
        // Only perform the move when the mouse has crossed half of the item's height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%
        
        // Dragging downwards
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return;
        }
        
        // Dragging upwards
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return;
        }
        
        // Time to actually perform the action
        moveStep(dragIndex, hoverIndex);
        
        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        item.index = hoverIndex;
      },
    });
    
    // Connect drag and drop refs
    drag(drop(ref));
    
    const getStepIcon = (type) => {
      const stepType = stepTypes.find(t => t.id === type);
      return stepType ? stepType.icon : <FileText size={18} />;
    };

    return (
      <div 
        ref={ref}
        className={`bg-white rounded-lg shadow-md mb-4 p-4 ${isDragging ? 'opacity-50' : ''} ${isOver ? 'border-2 border-blue-500' : ''}`}
        style={{ cursor: 'move' }}
      >
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center">
            <div className="bg-blue-100 text-blue-800 p-2 rounded-full mr-2">
              {getStepIcon(step.type)}
            </div>
            <div>
              <h3 className="font-medium">{step.name}</h3>
              <div className="text-sm text-gray-500 flex items-center">
                <Clock size={14} className="mr-1" />
                {step.delayDays > 0 ? `${step.delayDays} day${step.delayDays !== 1 ? 's' : ''} after previous step` : 'Immediately'}
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <Button
              variant="outline-secondary"
              size="sm"
              className="mr-2"
              onClick={() => openSegmentEditor(step.id)}
            >
              <Users size={14} className="mr-1" />
              {step.segments.length} Segments
            </Button>
            <Dropdown>
              <Dropdown.Toggle variant="outline-primary" size="sm" id={`step-type-${step.id}`}>
                Change Type
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {stepTypes.map(type => (
                  <Dropdown.Item key={type.id} onClick={() => {
                    const updatedSteps = journeySteps.map(s => 
                      s.id === step.id ? {...s, type: type.id} : s
                    );
                    setJourneySteps(updatedSteps);
                  }}>
                    <span className="mr-2">{type.icon}</span> {type.name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            <Button
              variant="outline-danger"
              size="sm"
              className="ml-2"
              onClick={() => removeStep(step.id)}
            >
              <Trash size={14} />
            </Button>
          </div>
        </div>

        <div className="mb-3">
          <Form.Group>
            <Form.Label className="text-sm">Step Delay</Form.Label>
            <div className="flex items-center">
              <Form.Control
                type="number"
                min="0"
                value={step.delayDays}
                onChange={(e) => {
                  const updatedSteps = journeySteps.map(s => 
                    s.id === step.id ? {...s, delayDays: parseInt(e.target.value) || 0} : s
                  );
                  setJourneySteps(updatedSteps);
                }}
                style={{ width: '80px' }}
              />
              <span className="ml-2">days after previous step</span>
            </div>
          </Form.Group>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-2">Channels</h4>
          {step.channels.length === 0 ? (
            <div className="text-center py-3 bg-gray-50 rounded border border-dashed border-gray-300">
              <p className="text-gray-500 text-sm mb-2">No channels added to this step</p>
            </div>
          ) : (
            <div className="space-y-2">
              {step.channels.map(channel => {
                const channelInfo = channelTypes.find(t => t.id === channel.type);
                return (
                  <div 
                    key={channel.id} 
                    className="flex items-center justify-between bg-gray-50 p-3 rounded border border-gray-200"
                  >
                    <div className="flex items-center">
                      <div className="bg-gray-200 p-2 rounded-full mr-2">
                        {channelInfo?.icon}
                      </div>
                      <div>
                        <div className="font-medium">{channelInfo?.name}</div>
                        <div className="text-xs text-gray-500">
                          {channel.content ? 
                            `${channel.content.substring(0, 30)}...` : 
                            'No content added'}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        className="mr-2"
                        onClick={() => openSegmentEditor(step.id, channel.id)}
                      >
                        <Users size={14} className="mr-1" />
                        {channel.segments.length}
                      </Button>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="mr-2"
                        onClick={() => openContentEditor(step.id, channel.id)}
                      >
                        <Edit size={14} />
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => removeChannelFromStep(step.id, channel.id)}
                      >
                        <Trash size={14} />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          <div className="mt-3">
            <Dropdown>
              <Dropdown.Toggle variant="primary" size="sm" id={`add-channel-${step.id}`}>
                <PlusCircle size={14} className="mr-1" /> Add Channel
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {channelTypes.map(channel => (
                  <Dropdown.Item 
                    key={channel.id}
                    onClick={() => addChannelToStep(step.id, channel.id)}
                  >
                    <span className="mr-2">{channel.icon}</span> {channel.name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>
    );
  };

  // Add a draggable new step option
  const DraggableNewStepItem = ({ addNewStep }) => {
    const [{ isDragging }, drag] = useDrag({
      type: ItemTypes.NEW_STEP,
      item: { isNew: true },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        if (monitor.didDrop()) {
          addNewStep();
        }
      }
    });
    
    return (
      <div
        ref={drag}
        className={`bg-green-50 border-2 border-dashed border-green-300 rounded-lg text-center p-4 mb-4 ${isDragging ? 'opacity-50' : ''}`}
        style={{ cursor: 'grab' }}
      >
        <div className="flex flex-col items-center">
          <PlusCircle size={24} className="text-green-500 mb-2" />
          <div className="font-medium text-green-600">Drag to add new step</div>
        </div>
      </div>
    );
  };
  
  // Drop target for step insertion
  const StepDropZone = ({ index, addStepAtPosition }) => {
    const [{ isOver, canDrop }, drop] = useDrop({
      accept: [ItemTypes.STEP, ItemTypes.NEW_STEP],
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
      drop: (item) => {
        if (item.isNew) {
          addStepAtPosition(index);
        }
        return { moved: true };
      },
    });
    
    return (
      <div
        ref={drop}
        className={`h-2 w-full my-1 transition-all duration-200 ${isOver && canDrop ? 'h-16 bg-blue-100 border border-dashed border-blue-500 rounded' : ''}`}
      >
        {isOver && canDrop && (
          <div className="flex items-center justify-center h-full">
            <span className="text-blue-500 text-sm">Drop here</span>
          </div>
        )}
      </div>
    );
  };

  // Content Editor Modal
  const ContentEditorModal = () => {
    const step = journeySteps.find(s => s.id === currentEditingStep);
    const channel = step?.channels.find(c => c.id === currentEditingChannel);
    const channelInfo = channel ? channelTypes.find(t => t.id === channel.type) : null;

    if (!step || !channel || !channelInfo) return null;

    return (
      <Modal show={showContentEditor} onHide={() => setShowContentEditor(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <div className="flex items-center">
              {channelInfo.icon}
              <span className="ml-2">Edit {channelInfo.name} Content</span>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3 flex justify-between">
            <Button
              variant="success"
              disabled={isGeneratingContent}
              onClick={generateAIContent}
            >
              {isGeneratingContent ? 'Generating...' : 'Generate with AI'}
            </Button>
            <div>
              <Badge bg="primary" className="mr-1">Step: {step.name}</Badge>
              <Badge bg="info">
                <Users size={12} className="mr-1" />
                {channel.segments.length} segments
              </Badge>
            </div>
          </div>

          {channel.type === 'email' ? (
            <Form.Group>
              <Form.Control
                as="textarea"
                rows={10}
                value={currentContent}
                onChange={(e) => setCurrentContent(e.target.value)}
                placeholder="Enter email content here..."
              />
            </Form.Group>
          ) : channel.type === 'sms' ? (
            <Form.Group>
              <Form.Control
                as="textarea"
                rows={3}
                value={currentContent}
                onChange={(e) => setCurrentContent(e.target.value)}
                placeholder="Enter SMS content here..."
                maxLength={160}
              />
              <Form.Text className="text-muted">
                {currentContent.length}/160 characters
              </Form.Text>
            </Form.Group>
          ) : (
            <Form.Group>
              <Form.Control
                as="textarea"
                rows={5}
                value={currentContent}
                onChange={(e) => setCurrentContent(e.target.value)}
                placeholder={`Enter ${channelInfo.name} content here...`}
              />
            </Form.Group>
          )}

          <div className="mt-3">
            <h5>Personalization Variables</h5>
            <div className="d-flex flex-wrap gap-1 mt-2">
              {['{{first_name}}', '{{last_name}}', '{{member_id}}', '{{pcp_name}}', '{{care_gap}}'].map(variable => (
                <Badge 
                  key={variable} 
                  bg="secondary" 
                  className="cursor-pointer"
                  onClick={() => setCurrentContent(currentContent + ' ' + variable)}
                >
                  {variable}
                </Badge>
              ))}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowContentEditor(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={saveContent}>
            Save Content
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  // Segment Editor Modal
  const SegmentEditorModal = () => {
    const step = journeySteps.find(s => s.id === currentEditingStep);
    if (!step) return null;

    const segments = currentEditingChannel
      ? step.channels.find(c => c.id === currentEditingChannel)?.segments || []
      : step.segments;

    const [localActiveSegments, setLocalActiveSegments] = useState([...segments]);

    return (
      <Modal show={showSegmentEditor} onHide={() => setShowSegmentEditor(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            <div className="flex items-center">
              <Users size={18} className="mr-2" />
              <span>
                Edit Segments for {currentEditingChannel ? 'Channel' : 'Step'}
              </span>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="mb-3">
            Select which segments should receive this {currentEditingChannel ? 'channel' : 'step'}:
          </p>
          
          <div className="mb-3">
            {selectedSegments.map(segment => (
              <Form.Check
                key={segment.id}
                type="checkbox"
                id={`segment-${segment.id}`}
                label={`${segment.name} (${segment.count.toLocaleString()} members)`}
                checked={localActiveSegments.some(s => s.id === segment.id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setLocalActiveSegments([...localActiveSegments, segment]);
                  } else {
                    setLocalActiveSegments(localActiveSegments.filter(s => s.id !== segment.id));
                  }
                }}
                className="mb-2"
              />
            ))}
          </div>
          
          <div className="bg-light p-3 rounded">
            <h6>Active Segment Statistics</h6>
            <div>Total Members: {localActiveSegments.reduce((sum, seg) => sum + seg.count, 0).toLocaleString()}</div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowSegmentEditor(false)}>
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={() => updateSegments(localActiveSegments)}
            disabled={localActiveSegments.length === 0}
          >
            Update Segments
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  // Campaign Configuration Modal
  const CampaignConfigModal = () => {
    const [campaignName, setCampaignName] = useState(`${campaignGoal} Campaign`);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    
    return (
      <Modal show={showCampaignConfig} onHide={() => setShowCampaignConfig(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Campaign Configuration</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Campaign Name</Form.Label>
            <Form.Control
              type="text"
              value={campaignName}
              onChange={(e) => setCampaignName(e.target.value)}
            />
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Campaign Frequency</Form.Label>
            <Form.Select>
              <option>One-time</option>
              <option>Recurring - Weekly</option>
              <option>Recurring - Monthly</option>
              <option>Trigger-based</option>
            </Form.Select>
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Campaign Owner</Form.Label>
            <Form.Control type="text" placeholder="Enter owner's name" />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCampaignConfig(false)}>
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={() => {
              setShowCampaignConfig(false);
              deployJourney();
            }}
          >
            Deploy Campaign
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  return (
    <div className="container-fluid py-4">
      {/* Start Options */}
      {showStartOptions ? (
        <div className="bg-white rounded-lg shadow-md p-5 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Create Your Journey</h2>
          
          <div className="bg-blue-50 p-4 rounded-lg mb-5">
            <h3 className="font-medium text-lg text-blue-800 mb-2">
              {campaignGoal} Campaign
            </h3>
            <div className="mb-2">
              <strong>Selected Segments:</strong>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedSegments.map(segment => (
                <Badge key={segment.id} bg="primary" className="py-2 px-3">
                  <div>{segment.name}</div>
                  <div className="text-xs">{segment.count.toLocaleString()} members</div>
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              className="bg-blue-50 hover:bg-blue-100 text-blue-700 p-5 rounded-lg border border-blue-200 flex flex-col items-center text-center"
              onClick={handleStartFromScratch}
            >
              <PlusCircle size={48} className="mb-3" />
              <h3 className="text-lg font-medium mb-2">Start from Scratch</h3>
              <p className="text-sm">Create a custom journey with your own steps and channels</p>
            </button>
            
            <button
              className="bg-gray-50 hover:bg-gray-100 text-gray-700 p-5 rounded-lg border border-gray-200 flex flex-col items-center text-center"
              onClick={handleImportJourney}
            >
              <Copy size={48} className="mb-3" />
              <h3 className="text-lg font-medium mb-2">Import Journey</h3>
              <p className="text-sm">Upload an existing journey from another campaign</p>
            </button>
            
            <button
              className="bg-green-50 hover:bg-green-100 text-green-700 p-5 rounded-lg border border-green-200 flex flex-col items-center text-center"
              onClick={handleUseTemplate}
            >
              <FileText size={48} className="mb-3" />
              <h3 className="text-lg font-medium mb-2">Use a Template</h3>
              <p className="text-sm">Start with a pre-built journey optimized for your goal</p>
            </button>
          </div>
        </div>
      ) : (
        <div>
          {/* Journey Builder Header */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <div className="flex flex-wrap justify-between items-center">
              <div>
                <h2 className="text-xl font-bold">{campaignGoal} Journey Builder</h2>
                <div className="text-sm text-gray-500 mt-1">
                  Building journey for {selectedSegments.length} segments ({selectedSegments.reduce((sum, seg) => sum + seg.count, 0).toLocaleString()} total members)
                </div>
              </div>
              <div className="flex items-center">
                <Button
                  variant="outline-primary"
                  className="mr-2"
                  onClick={() => setShowStartOptions(true)}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  className="mr-2"
                  onClick={() => setShowCampaignConfig(true)}
                  disabled={journeySteps.length === 0}
                >
                  Deploy Campaign
                </Button>
              </div>
            </div>
          </div>
          
          {/* Journey Steps */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="mb-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-medium">Journey Steps</h3>
                <div className="text-sm text-gray-500">
                  Drag steps to reorder or drag the "new step" to specific positions
                </div>
              </div>
              
              <div className="mb-6 flex">
                <div className="w-full">
                  {/* Initial drop zone */}
                  <StepDropZone 
                    index={0}
                    addStepAtPosition={addStepAtPosition}
                  />
                  
                  {journeySteps.map((step, index) => (
                    <React.Fragment key={step.id}>
                      <DraggableStepItem 
                        step={step} 
                        index={index}
                        moveStep={moveStep}
                      />
                      <StepDropZone 
                        index={index + 1}
                        addStepAtPosition={addStepAtPosition}
                      />
                    </React.Fragment>
                  ))}
                </div>
                
                <div className="ml-4 w-64">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-medium mb-3">Add Steps</h4>
                    <DraggableNewStepItem addNewStep={addStep} />
                    <div className="text-center my-2">OR</div>
                    <Button variant="success" onClick={addStep} className="w-full">
                      <PlusCircle size={16} className="mr-1" /> Add Step
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Toast */}
      <Toast 
        show={showSuccessToast} 
        onClose={() => setShowSuccessToast(false)}
        style={{ position: 'fixed', bottom: '20px', right: '20px' }}
        bg="success"
      >
        <Toast.Header>
          <strong className="me-auto">Success</strong>
        </Toast.Header>
        <Toast.Body className="text-white">
          Campaign deployed successfully! Redirecting to campaigns dashboard...
        </Toast.Body>
      </Toast>

      {/* Modals */}
      <ContentEditorModal />
      <SegmentEditorModal />
      <CampaignConfigModal />
    </div>
  );
};

// Mock data for the example
const exampleCampaignGoal = "Member Onboarding";
const exampleSelectedSegments = [
  { id: 1, name: "New Medicare Advantage Members", count: 3240 },
  { id: 2, name: "Spanish-Speaking Members", count: 1450 },
  { id: 3, name: "Digital-First Preference", count: 2850 }
];

const JourneyBuilderPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <nav className="bg-blue-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">AI Healthcare Engagement Platform</h1>
          <div>
            <span className="mr-4">Campaigns</span>
            <span className="mr-4">Analytics</span>
            <span>Help</span>
          </div>
        </div>
      </nav>
      
      <div className="container mx-auto py-6">
        <JourneyBuilder 
          campaignGoal={exampleCampaignGoal}
          selectedSegments={exampleSelectedSegments}
        />
      </div>
    </div>
  );
};

export default JourneyBuilderPage;